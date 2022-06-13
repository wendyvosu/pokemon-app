const express = require("express")
const app = express()
const port = 3000
const pokemonData = require("./models/pokemon")
require("dotenv").config()
const mongoose = require("mongoose")
const pokemonModel = require("./models/pokemon-models")

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("Welcome to the Pokemon App!");
})

app.get("/pokemon", async (req, res) => {
    try {
    const pokemons = await pokemonModel.find();

    res.render("index", {
        pageTitle: "Pokemon",
        pageHeader: "See All the Pokemon!", 
        pokemonData: pokemons, 
    });  
    } catch (error) {
        console.log(error);
    }
});

app.get("/pokemon/new", (req, res) => {
    res.render("new", {
        pageTitle: "New Pokemon", 
        pageHeader: "Create a new Pokemon",
    })
})

app.post("/pokemon", async (req, res) => {
    const newPokemon = req.body;
    newPokemon.img = `http://img.pokemondb.net/artwork/${req.body.name}`;
    console.log(newPokemon);

    await pokemonModel.create(newPokemon, (error, result) => {
        if (error) {
            console.log(error)
        }

        console.log(result);
    })
})

app.get("/pokemon/:id", async (req, res) => {
try {
    console.log(req.params.id)
    const pokemon = await pokemonModel.findById(req.params.id)
    console.log("POKEMON FOUND!", pokemon);
    res.render("show", {
        pageTitle: "Details", 
        pageHeader: "Gotta Catch 'Em All", 
        pokemon: pokemon,
    });
} catch (error) {
    console.log(error)
}
});  

app.listen(port, () => {
    console.log("Server is running...");
    mongoose.connect(process.env.MONGODB_URI)
})