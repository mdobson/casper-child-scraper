Toy scraper project that uses node child processes to spawn a phantomjs/casperjs scraper that will scrape content off web pages format it into JSON and return to requester.

Example curl:

curl -i -X POST -d '{"selector":".title > a","url":"http://news.ycombinator.com","props":["innerText","href"]}' http://127.0.0.1:1337/

selector -> Html selector
url -> page url
props -> html node properties that you want returned in your json structure.

