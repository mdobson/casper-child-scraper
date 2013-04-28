##Casperjs based scraping project

Simple scraper written with casperjs. Meant to be an interesting addition to show of the differences in Golang and Nodejs.
Scraper simply takes a url, css selector, and html element attributes that are accessible through javascript. It returns an array
of JSON objects containing the content desired from the html properties, and all objects conform to the selector property.

Example curl:

    curl -i -X POST -d '{"selector":".title > a","url":"http://news.ycombinator.com","props":["innerText","href"]}' http://127.0.0.1:1337/

selector -> Html selector
url -> page url
props -> html node properties that you want returned in your json structure.

