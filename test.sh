curl -i -X POST -d '{"url":"http://news.ycombinator.com","selector":".title > a","properties":["innerText","href"]}' http://0.0.0.0:1337/
