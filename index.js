const { Pool } = require("pg")
const fs = require("fs")
const http = require("http")

http.createServer( (req, res) => {
    if(req.url == '/' && req.method == 'GET'){
        res.setHeader('content-type','text/html')
        const html = fs.readFileSync('index.html','utf8')
        res.end(html)
    }
    
}).listen(3000)