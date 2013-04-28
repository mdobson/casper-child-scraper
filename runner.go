package main
import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os/exec"
)

type Response map[string]interface{}

type Arguments struct {
	Url string
	Selector string
	Properties [2]string
}

func (r Response) String() (s string) {
        b, err := json.Marshal(r)
        if err != nil {
                s = ""
                return
        }
        s = string(b)
        return
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "POST" {
		buf, err := ioutil.ReadAll(r.Body)
		if err == nil {
			jsonStr := string(buf)
			res := &Arguments{}
			json.Unmarshal([]byte(jsonStr), &res)
			scrapeCmd := exec.Command("casperjs","scraper.js",fmt.Sprintf("--url=%s",res.Url),fmt.Sprintf("--selector=%s",res.Selector),res.Properties[0], res.Properties[1])
			scrape, err := scrapeCmd.Output()
			if err != nil {
		        panic(err)
		    }
		    
		    response := &Response{}
		    scrapeResults := string(scrape)
		    json.Unmarshal([]byte(scrapeResults), &response)

			fmt.Fprint(w, Response{"success": true, "data": response})
		} else {
			fmt.Fprint(w, Response{"success": false, "data": "Error parsing body"})
		}
	} else {
		fmt.Fprint(w, Response{"success": true, "message": fmt.Sprintf("%s", r.URL.Path[1:])})
	}

}

func main() {
	http.HandleFunc("/",handler)
	http.ListenAndServe(":8080", nil)
}