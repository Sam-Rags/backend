// required imports
const express = require("express")
var cors = require("cors")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const Movie = require("./models/movies")
const mongoose = require("mongoose")
require("dotenv").config()
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
app.get('/', (req, res) => {
    res.send('Hello Sam!')
})

app.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({})
        res.send(movies)
        console.log("Movie list: " + movies)
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/movies', async (req, res) => {
    try {
        const movie = await new Movie(req.body)
        await course.save()
        res.status(201).json(course)
        console.log("Movie successfully added to database.")
    }
    catch (err) {
        res.status(400).send(err)
    }
})


const port = 3000
app.use("/api", router)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})