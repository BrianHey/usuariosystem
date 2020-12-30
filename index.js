const fs = require("fs");
const http = require("http");

const { agregarUsuario, consultarUsuario, devolver } = require("./consultas");

http
  .createServer(async (req, res) => {
    if (req.url == "/" && req.method == "GET") {
      res.setHeader("content-type", "text/html");
      const html = fs.readFileSync("index.html", "utf8");
      res.end(html);
    }
    if (req.url == "/usuario" && req.method == "POST") {
      let body = "";
      req.on("data", (datos) => {
        body += datos;
      });
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        const result = await agregarUsuario(datos);
        res.end(JSON.stringify(result));
      });
    }
    if (req.url == "/login" && req.method == "POST") {
      let body = "";
      req.on("data", (datos) => {
        body += datos;
      });
      req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        const result = await consultarUsuario(datos);
        result == 0 ? (res.writeHead(404, "El usuario ingresado no existe"), res.end()) : res.end(JSON.stringify(result));
      });
    }
    if (req.url == "/usuarios" && req.method == "GET") {
      const usuarios = await devolver();
      res.end(JSON.stringify(usuarios));
    }
  })
  .listen(3000, () => console.log("Servidor en puerto 3000"));
