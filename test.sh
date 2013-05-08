curl -i -X POST -d '{"url":"http://news.ycombinator.com","selector":".title > a","properties":["innerText","href"]}' http://0.0.0.0:3000/
curl -i -X POST -d '{"url":"http://news.ycombinator.com","selector":".title > a","properties":["innerText","href"]}' http://casperapi.herokuapp.com/
