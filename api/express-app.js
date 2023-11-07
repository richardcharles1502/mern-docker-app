var express = require("express");
var app = express();
const PORT = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//mongo means the database used in docker and mentioned in compose file test
mongoose.connect("mongodb://mongo/register",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database Connected");
});
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("register", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

app.get("/alluser", async (req, res) => {
    let collection = await db.collection("register");
    let results = await collection.find({}).limit(50).toArray();
    res.send(results).status(200);
});

// add middleware , jwt auth token use , verfiy and purify the api

app.post("/reguser", async (req, res) => {
    // need to handle validation if error
    let collection = await db.collection("register");
    let newDocument = req.body.data;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
