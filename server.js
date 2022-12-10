const express = require("express");
const path = require("path");
const fs = require('fs');


// use this unique ID helper?????????????
//const uuid = require('./helpers/uuid');

//in helpers/uuid:

//module.exports = () =>
//  Math.floor((1 + Math.random()) * 0x10000)
//    .toString(16)
//    .substring(1);



const PORT = 3001;

const app = express();

app.use(express.json());


app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => 
  //read db.json file and return all saved notes as JSON
);

app.post("/api/notes", (req, res) => 
  //receive new note to save on requested body. Add to db.json file and return new note to slient
  //need to find a way to give each note a unique id (look at previous activities)
);





//EXTRA, DO IT CUZ IT'S EASY
app.delete("/api/notes/:id", (req, res) =>
  //remove specified note from db.json file based on id, rewrite notes to db.json file
);