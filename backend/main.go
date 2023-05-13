package main

import (
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
		fmt.Fprintf(w,"Hello World on /pushML")
	case "POST":
		
		r.ParseForm()

		query := r.FormValue("us")

		/*
		for k, v := range r.Form {

		}
		*/

		prompts := []str{"Which of the following appliances are used to ",
			"In which of the following rooms can be used to ",
			"What should do when ",
		}

		
		
		query := `In which of the following rooms can I bake a cake?
- balcony
- bathroom
- cellar
- dining room
- documents
- garden
- gym
- hall-corridor
- kitchen
- laundry room
- living room
- office
- outdoor building
- outdoor house
- parking
- pool
- reception-lobby
- room-bedroom
- storage pantry
- terrace
`
		
		fq := src.FlanQuery{
			Endp: os.Getenv("HF_ENDP"),
			QueryString: query,
		}

		
		hf_terms := src.FlanHF(fq)
		fmt.Println(hf_terms)
		
		fmt.Fprintf(w, "POST ON /pushML")
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


	// fs := http.File

	http.HandleFunc("/",root)
	// http.HandleFunc("/authorize",authorize)
	http.HandleFunc("/getHouses", getHouses)
	
	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port,nil))
	
}
