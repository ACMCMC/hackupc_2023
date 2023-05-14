package main

import (
	"bytes"
	"io/ioutil"
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

type Cache struct {
	Endp string `json:"endp"`
	Query string `json:"query"`
	Result string `json:"result"`
}


func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin","*")
}

func root(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	switch r.Method {
	default:
		fmt.Fprintf(w, "NOT AVAILABLE")
	}

	fmt.Fprintf(w, "Hello World on /")
}

func getHouses(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	switch r.Method {
	case "GET":
		fmt.Fprintf(w,"Asking the question: <code>Which of the following appliances are used to [prompt]? [Enter List Here]</code>")


	case "POST":
		
		r.ParseForm()

		var params src.HFIngest

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			fmt.Println(err)
		}

		defer r.Body.Close()
		// fmt.Println(params)

		appliances := `- radiator
- ac
- dishwasher
- microwave
- oven
- washer
- dryer
- stovetop
- refrigerator
- tv
- water heater
`
		
		for _,param := range params.Params {
			// fmt.Println(param)
			query := fmt.Sprintf("Which of the following applicanes are used to %s?\n%s\n\nAnswer: ", param, appliances)
			fmt.Println(query)
			fq := src.FlanQuery{
				Endp: os.Getenv("HF_ENDP"),
				QueryString: query,
			}

			hf_terms := src.FlanHF(fq)
			fmt.Println(hf_terms)
			fmt.Fprintf(w, hf_terms)

		}
	default:
		fmt.Fprintf(w, "NOT AVAILABLE")
	}
}


func getCompletion(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	
	switch r.Method {
	case "GET":
		query := r.URL.Query()

		text := query.Get("text")


		complPrompt := `For each noun, write the corresponding verb.
## Example 1: book
Anwser: read
## Example 2: coffee
Answer: brew
## Example 3: movie
Answer: watch
## Example 4:`
		input := fmt.Sprintf("%s %s\nAnswer: ", complPrompt, text)
		fmt.Println(input)
		postBod, err := json.Marshal(map[string]string{
			"inputs":input,
		})

		if err != nil {
			log.Fatalf("%v", err)
		}

		respBod := bytes.NewBuffer(postBod)
		
		resp, err := http.Post(os.Getenv("HF_ENDP_COMPL"), "application/json",respBod)

		if err != nil {
			log.Fatalln(err)
		}

		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		sb := string(body)
			
		fmt.Fprintf(w,sb)
		
	case "default":
		fmt.Fprintf(w, "bruh what is we doing")
	}
}


func getReview(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	
	switch r.Method {
	case "POST":
		
		r.ParseForm()

		var params src.HFIngest

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			fmt.Println(err)
		}

		defer r.Body.Close()

		input := fmt.Sprintf("Here is some data:\n%s\n\nWrite a sentence that describes this data.", params.Params)
		fmt.Println(input)
		postBod, err := json.Marshal(map[string]string{
			"inputs":input,
		})

		if err != nil {
			log.Fatalf("%v", err)
		}

		respBod := bytes.NewBuffer(postBod)
		
		resp, err := http.Post(os.Getenv("HF_ENDP_COMPL"), "application/json", respBod)

		if err != nil {
			log.Fatalln(err)
		}

		defer resp.Body.Close()

		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		sb := string(body)
			
		fmt.Fprintf(w,sb)
		
	case "default":
		fmt.Fprintf(w, "bruh what is we doing")
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
	http.HandleFunc("/getHouses", getHouses)
	http.HandleFunc("/getCompletion", getCompletion)
	
	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port,nil))
	
}
