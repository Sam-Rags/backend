// required db import to interact with database
const db = require("../db");

const Movie = db.model("Movie", {
    //TODO create Movie model
    title:          {type: String, required: true},
    releaseYear:    {type: Number},
    rating:         {type: String},
    imdbLink:       {type: String},
    description:    {type: String},
    genre:          {type: [String]}

});

module.exports = Movie;