package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"github.com/joho/godotenv"
	"elastic/go-elasticsearch"
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

func authorize(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w,"Hello World on /authorize")
	case "POST":
		fmt.Fprintf(w, "POST ON /authorize")
	default:
		fmt.Fprintf(w, "NOT AVAILABLE")

	}
}

func pushML(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w,"Hello World on /pushML")
	case "POST":
		fmt.Fprintf(w, "POST ON /pushML")
	default:
		fmt.Fprintf(w, "NOT AVAILABLE")
	}
}


func main() {
	// (int) port gets converted to a string
	port := strconv.Itoa(PORT)

	// err handling when trying to get
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(".env file: %s", err.Error)
	}

	
	
	// fs := http.File

	http.HandleFunc("/",root)
	http.HandleFunc("/authorize",authorize)
	http.HandleFunc("/pushML", pushML)
	
	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port,nil))
	
}
