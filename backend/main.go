package main

import (
	"encoding/json"
	"os"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"github.com/joho/godotenv"
	// "elastic/go-elasticsearch"
	"github.com/AOrps/hackupc_2023/backend/src"
)

const (
	PORT = 9991
)

func root(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w,"Hello World on /")
	case "POST":
		fmt.Fprintf(w, "POST ON /")
	default:
		fmt.Fprintf(w, "NOT AVAILABLE")
	}

	fmt.Fprintf(w, "Hello World on /")
}

func getHouses(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w,"Asking the question: <code>Which of the following appliances are used to [prompt]? [Enter List Here]</code>")
	case "POST":
		
		r.ParseForm()

		var params src.HFIngest
		// paramParse := r.FormValue("params")
		// err := json.Unmarshal([]byte(paramParse),&params)

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			fmt.Println(err)
		}

		defer r.Body.Close()
		
		//dec := json.NewDecoder(&params)
		/*
		for err := dec.Decode(&v); err != nil && err != io.EOF; {
			log.Println(err)
		}
		*/
		
		fmt.Println(params)

		/*		
		for k, values := range r.Form {
			for _, value := range values {
				fmt.Println(k, value)
			}
		}
		prompts := []string{"Which of the following appliances are used to ",
			"In which of the following rooms can be used to ",
			"What should do when ",
		}
		*/


		for _,param := range params.Params {
			// fmt.Println(param)
			query := fmt.Sprintf("Which of the following applicanes are used to [%s]", param)
			fmt.Println(query)
			fq := src.FlanQuery{
				Endp: os.Getenv("HF_ENDP"),
				QueryString: query,
			}

			hf_terms := src.FlanHF(fq)
			fmt.Println(hf_terms)
			fmt.Fprintf(w, hf_terms)

		}
		/*
		hf_terms := src.FlanHF(fq)
		fmt.Println(hf_terms)
		fmt.Fprintf(w, hf_terms)
		*/
	default:
		fmt.Fprintf(w, "NOT AVAILABLE")
	}
}

func init() {
	// err handling when trying to get
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(".env file: %s", err.Error)
	}
}


func main() {
	// (int) port gets converted to a string
	port := strconv.Itoa(PORT)

	http.HandleFunc("/",root)
	// http.HandleFunc("/authorize",authorize)
	http.HandleFunc("/getHouses", getHouses)
	
	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port,nil))
	
}
