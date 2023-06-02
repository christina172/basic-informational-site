const http = require("http");
const fs = require("fs");
const path = require('path');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    let pathName;
    res.statusCode = 200;

    let extension = path.extname(req.url);
    if (extension == ".css") {
        res.setHeader('Content-Type', 'text/css');
        pathName = "styles.css";
    } else if (extension == ".jpg") {
        res.setHeader('Content-Type', 'image/jpg');
        pathName = "woodland-sage.jpg";
    } else {
        res.setHeader('Content-Type', 'text/html');
        if (req.url == "/") {
            pathName = "index.html";
        } else if (req.url == "/about") {
            pathName = "about.html";
        } else if (req.url == "/contact-me") {
            pathName = "contact-me.html";
        } else {
            pathName = "404.html";
            res.statusCode = 404;
        };
    }

    fs.readFile(pathName, (err, data) => {
        if (err) {
            console.error(err);
            res.end();
        } else {
            res.end(data);
        }
    });
});

server.listen(port, hostname);