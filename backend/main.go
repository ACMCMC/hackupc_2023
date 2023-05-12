package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
)

const (
	PORT = 9991
)

func root(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "yo root ")
}

func authorize(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		fmt.Fprintf(w, "yo yo yo")
	default:
		fmt.Fprintf(w,"Hello")
	}
}

func main() {
	port := strconv.Itoa(PORT)

	// fs := http.File

	http.HandleFunc("/",root)
	http.HandleFunc("/authorize",authorize)	
	
	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port,nil))
	
}
