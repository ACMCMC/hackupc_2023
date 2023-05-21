package main

import (
	"strings"
	"bufio"
	"time"
	// "os/exec"
	"bytes"
	"math/rand"
	"io/ioutil"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strconv"

	"github.com/joho/godotenv"

	// "elastic/go-elasticsearch"
	"github.com/AOrps/hackupc_2023/backend/src"
	"database/sql"
    _ "github.com/lib/pq"
)

const (
	PORT = 9991
)

func randomInt(min, max int) int {
	rand.Seed(time.Now().UnixNano())
	return rand.Intn(max-min+1) + min
}

func findLineWithWord(filename string, word string) (string, error) {
    file, err := os.Open(filename)
    if err != nil {
        return "", err
    }
    defer file.Close()

    i := 0
    randNumMin := randomInt(1,100)
    randNumMax := randomInt(100,4000)
    randNum := randomInt(randNumMin,randNumMax)

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        line := scanner.Text()
        if strings.Contains(line, word) && i > randNum {
            return line, nil
        }
	i += 1
    }

    if err := scanner.Err(); err != nil {
        return "", err
    }

    return "", fmt.Errorf("Word not found")
}


type Cache struct {
	Endp string `json:"endp"`
	Query string `json:"query"`
	Result string `json:"result"`
}

type Config struct {
    DBUsername string
    DBPassword string
    DBHost     string
    DBPort     string
    DBName     string
}

func loadConfig() (*Config, error) {
    config := Config{}
    config.DBUsername = os.Getenv("DB_USERNAME")
    config.DBPassword = os.Getenv("DB_PASSWORD")
    config.DBHost = os.Getenv("DB_HOST")
    config.DBPort = os.Getenv("DB_PORT")
    config.DBName = os.Getenv("DB_NAME")

    if config.DBUsername == "" || config.DBPassword == "" || config.DBHost == "" || config.DBPort == "" || config.DBName == "" {
        return nil, errors.New("missing environment variable(s)")
    }

    return &config, nil
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
		// CompleteData = getData("getHouses", r.URL.Query())
		// if len(CompleteData) > 0 {
		// 	fmt.Printf("Data found in cache")
		// 	return completeddata 
		// }
		// fmt.Printf("Data not found in cache")

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

		// CompleteData = getData("getCompletion", text)
		// if len(CompleteData) > 0 {
		// 	fmt.Printf("Data found in cache")
		// 	return CompleteData
		// }
		// fmt.Printf("Data not found in cache")

		complPrompt := `For each noun, write the corresponding verb.
## Example 1: book
Answer: read
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

type HFOngest struct {
	Params string `json:"params"`
	ForStudents bool `json:"forStudents"`
	Sustainable bool `json:"sustainable"`
	OrderBy string `json:"orderBy"`
}


func getReview(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	
	switch r.Method {
	case "GET":
		// query := r.URL.Query()
	case "POST":
		r.ParseForm()

		var params HFOngest

		// fmt.Println(r)
		// fmt.Printf("[%s]", params.Params)
		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			log.Fatal(err)
		}

		defer r.Body.Close()

		input := fmt.Sprintf("Here is some data:\n%s\n\nWrite a sentence that describes this data.", params.Params)
		fmt.Println(input)
		postBod, err := json.Marshal(map[string]string{
			"inputs":input,
			"min_length":"250",
		})

		// fmt.Println(input)

		// fmt.Println(postBod)
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
		// w.Header().Set("Content-Type","application/json")			
		fmt.Fprintf(w,sb)
		
	case "default":
		fmt.Fprintf(w, "bruh what is we doing")
	}
}
func insertData(resource string, query string, result string) error {
	config, err := loadConfig()
    if err != nil {
		fmt.Printf("Load Fail")
        log.Fatalf("error loading configuration: %v", err)
    }

    db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s ", config.DBHost, config.DBPort, config.DBUsername, config.DBPassword, config.DBName))
    if err != nil {
        log.Fatalf("error connecting to database: %v", err)
    }
    defer db.Close()
    
	fmt.Printf("Connected to database")
    // Prepare the SQL statement for insertion
    stmt, err := db.Prepare("INSERT INTO public.\"Cache_DB\" (resource, query, result) VALUES ($1, $2, $3)")
    if err != nil {
        return err
    }
    defer stmt.Close()
	fmt.Printf("Prepared statement")
    // Execute the SQL statement with the provided data
    _, err = stmt.Exec(resource, query, result)
    if err != nil {
		log.Fatal(err)
        return err
    }
	fmt.Printf("Inserted data")
    return nil
}

type Data struct {
	Resource string
	Query string
	Result string
}

func getData(resource, query string) ([]Data, error) {
	config, err := loadConfig()
    if err != nil {
        log.Fatalf("error loading configuration: %v", err)
    }

    db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", config.DBHost, config.DBPort, config.DBUsername, config.DBPassword, config.DBName))
    if err != nil {
        log.Fatalf("error connecting to database: %v", err)
    }

    defer db.Close()

    // Prepare the SQL statement for selecting data with the specified resource and query values
    rows, err := db.Query("SELECT resource, query, result FROM public.\"Cache_DB\" WHERE resource = $1 AND query = $2", resource, query)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    // Iterate through the rows and store the data in a slice
    var data []Data
    for rows.Next() {
        var resource string
        var query string
        var result string
        err := rows.Scan(&resource, &query, &result)
        if err != nil {
            return nil, err
        }
        data = append(data, Data{Resource: resource, Query: query, Result: result})
    }
    err = rows.Err()
    if err != nil {
        return nil, err
    }

    return data, nil
}

func init() {
	// err handling when trying to get
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(".env file: %s", err.Error)
	}
}

func esHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	switch r.Method {
	case "GET":
		query := r.URL.Query()

		term:= query.Get("term")
		// fmt.Fprintf(w, term)

		line,err := findLineWithWord("e-10k.json", term)
		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println(line)
		}

		fmt.Fprintf(w,line)
		/*
		amt, err := strconv.Atoi(query.Get("amt"))

		if err != nil {
			log.Fatal(err)
		}
		
		// amt := 20

		// cmdPrompt := fmt.Sprintf("python3 estool.py %s %s",term, amt)
		cmdPrompt_HACKED := fmt.Sprintf("python3 estool.py ",term)
		// cmd := exec.Command(cmdPrompt)
		cmd := exec.Command(cmdPrompt_HACKED)

		out, err := cmd.Output()

		fmt.Println(out)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Fprintf(w, "%s", string(out))
		// src.EsSearch(term, amt)
		*/
	default:
		fmt.Fprintf(w, "Not available")
	}
}


func main() {
	// (int) port gets converted to a string
	//getData("testingresource123","testingquery")
	insertData("testingresource2","testingquery2","testingresult2")
	port := strconv.Itoa(PORT)
	http.HandleFunc("/",root)
	http.HandleFunc("/getAppliances", getHouses)
	http.HandleFunc("/getCompletion", getCompletion)
	http.HandleFunc("/getReview", getReview)
	http.HandleFunc("/getEs", esHandler)
	http.HandleFunc("/getES", esHandler)	

	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port,nil))
	
}
