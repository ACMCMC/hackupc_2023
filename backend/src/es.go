package src

// for elastic search
/*
import (
	// "bytes"
	// "io/ioutil"
	"log"
	"os"
	"fmt"
	// "net/http"
	"github.com/elastic/go-elasticsearch/v8"
	// "github.com/elastic/go-elasticsearch/v8/esapi"
	// "github.com/elastic/go-elasticsearch/v8/esutil"
	// "github.com/elastic/go-elasticsearch/v8/esutil/estransport"
	// "github.com/elastic/go-elasticsearch/v8/esutil/esjson"
	// "github.com/elastic/go-elasticsearch/v8/esutil/esuuid"
	// "github.com/elastic/go-elasticsearch/v8/esutil/json"
	// "github.com/elastic/go-elasticsearch/v8/esutil/pretty"
	// "github.com/elastic/go-elasticsearch/v8/esutil/strcoll"
	// "github.com/elastic/go-elasticsearch/v8/esutil/strutil"
	// "github.com/elastic/go-elasticsearch/v8/esutil/template"
	// "github.com/elastic/go-elasticsearch/v8/esutil/typeassert"
	// "github.com/elastic/go-elasticsearch/v8/esutil/version"
	// "github.com/elastic/go-elasticsearch/v8/internal/version"
	// "github.com/elastic/go-elasticsearch/v8/transport"
	// "github.com/elastic/go-elasticsearch/v8/transport/http"
)

type ESIngest  struct {
	Params []string `json:params`
}

// term --> search string and n the number of records outputed
/*
func EsSearch(term string, n int) {
	cfg := elasticsearch.Config{
		CloudID: os.Getenv("ELASTICSEARCH_CLOUDID"),
		APIKey: os.Getenv("ELASTICSEARCH_API_KEY"),
	}

	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		log.Fatal(err)
	}

	
	fmt.Println(es.Info())


	res, err := es.Search()

	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	fmt.Println(res)

	
	res, err := es.Search().Index("index_name").
		Request(&search.Request{
			Query: &types.Query{
				Match: map[string]types.MatchQuery{
					"name": {Query: "Foo"},
				},
			},
		}).Do(context.Background())
	/*	
	rJsonQuery := fmt.Sprintf(`{
"query": {
  "term": {
    "image_data.feature" : {
       "value: %s
     } 
  }
}
}
`, term)
	fmt.Println(rJsonQuery)

	res, err := es.Search().Raw([]byte(rJsonQuery))
	if err != nil {
		log.Fatal(err)
	}

	
	fmt.Println(res)


	// es.Search().Raw([]byte(`{"query": { "term": {  "image_data.feature" : {  "value:} }}}`))
	fmt.Println(es)

}
*/


