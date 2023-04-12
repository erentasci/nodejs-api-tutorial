const express = require("express");
const aktorlerRouter = require("./routers/aktorlerRouter.js");

const server = express();
server.use(express.json()); // To parse
server.use("/aktorler", aktorlerRouter); // localhost:5000/aktorler istekleri karşılanacak.

server.get("/", (req, res) => {
  res.send("Hello, Express!");
});

server.listen(5000, () => {
  console.log("http//localhost:5000 adresine gelen istekler dinleniyor...");
});
