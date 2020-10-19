// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
import express from "express";
import { botInit } from "./services/telegramService";
import {config as dotenv_config} from "dotenv"
dotenv_config()

const {PORT} = process.env;
const app = express();

botInit(app);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.get('/keepalive',(req,res) => {
  return res.send('Alive');
});
// https://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(__dirname + "/views/index.html");
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
