// required imports
const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
require("dotenv").config()
const uri = process.env.MONGODB_URI

// run function will connect to URI stored in .env (git ignored for security)
async function run() {
    try {
        mongoose.connect(uri).then(() => console.log("Connected to database..."))
    }
    catch (err) {
        console.log("Could not connect to database.", err)
    }
}
run().catch(console.dir)

//export the module
module.exports = mongoose