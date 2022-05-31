const { escapeRegExpChars } = require("ejs/lib/utils")
const express = require("express")
const app = express()
const port = 3000
const pokemon = require("./models/pokemon")

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.send("Welcome to the Pokemon App!");
})

app.get("/pokemon", (req, res) => {
    res.render("index", {data:pokemon});
})

app.listen(port, () => {
    console.log("Server is running...");
})