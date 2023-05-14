package src

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

type FlanQuery struct  {
	Endp string
	QueryString string
}
type HFIngest struct {
	Params []string `json:"params"`
	ForStudents bool `json:"forStudents"` // elastic search 
	Sustainable bool `json:"sustainable"` // elastic search
	OrderBy string `json:"orderBy"`
}


func FlanHF(fq FlanQuery) string {

	postBod, err := json.Marshal(map[string]string{
		"inputs":fq.QueryString,
	})

	if err != nil {
		log.Fatalf("%v", err)
	}

	respBod := bytes.NewBuffer(postBod)
	
	resp, err := http.Post(fq.Endp, "application/json",respBod)

	if err != nil {
		log.Fatalln(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}

	sb := string(body)
	return sb
}


