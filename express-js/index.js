const express = require("express");
const aktorlerRouter = require("./routers/aktorlerRouter.js");
const logger = require("./middlewares/logger.js");
const errorHandling = require("./middlewares/errorHandling.js");

const server = express();
server.use(express.json()); // To parse
server.use(logger);
server.use("/aktorler", aktorlerRouter); // localhost:5000/aktorler istekleri karşılanacak.

server.get("/", (req, res) => {
  res.send("Hello, Express!");
});

server.use(errorHandling);
server.listen(5000, () => {
  console.log("http//localhost:5000 adresine gelen istekler dinleniyor...");
});
