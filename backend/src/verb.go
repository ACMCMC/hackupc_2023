package src

import (
	"encoding/json"
	"net/http"
	"fmt"
	"log"
)
	

type VerbQuery struct {
	SS string
}

type dummy struct {
	dum string
	dum2 string
}

func GetVerb(word VerbQuery) []string {
	_, err := json.Marshal(map[string]string{
		"inputs": word.SS,
	})

	if err != nil {
		log.Fatalln(err)
	}

	

	return []string{"tasdfsa", "gadfs"}
}

func HandleVerb(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w,"Hello World on /verb")
	case "POST":
		r.ParseForm()

		decoder := json.NewDecoder(r.Body)
		var t dummy

		err := decoder.Decode(&t)

		if err != nil {
			log.Fatal(err)
		}
		
	default:
		fmt.Fprintf(w, "Not Available")
	}
}
