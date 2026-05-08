const express = require('express')
// required imports

var cors = require('cors')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const Movie = require('./models/movies')
const mongoose = require('mongoose')
require('dotenv').config()
require('./db')
let reqCount = 0

// cors allows cross origin requests
app.use(cors())
app.use(bodyParser.json())

// the use method has no mount path, therefore runs everytime the app receives any req
/**app.use((req, res, next) => {
    console.log('Request count = ', ++reqCount)
    next()
})  */


// Test get to verify function
// app.get('/', (req, res) => {
//     res.send('Hello Sam!')
// })

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find({})
        res.send(movies)
        console.log("GET request; movie list: " + movies)
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/api/movies', async (req, res) => {
    try {
        const movie = await new Movie(req.body)
        await movie.save()
        res.status(201).json(movie)
        console.log("Movie successfully added to database.")
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})

app.delete('/api/movies/:id', async (req, res) => {
    try {
    const result = await Movie.deleteOne({ _id: req.params.id })
    if (result.deletedCount === 0 ) {
        return res.sendStatus(404)
    }
    console.log("Movie deleted.")
    res.sendStatus(204)
    
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})

app.put('/api/movies/:id', async (req, res) => {
    try {
        const movie = req.body
        await Movie.updateOne({ _id: req.params.id }, movie)
        let title = await Movie.findOne({ _id: req.params.id }, { _id: 0, title: 1})
        console.log("Updated movie: "+ title)
        res.sendStatus(204)
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
})


const port = 3000
// app.use("/api", router)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})