// I thought about adding a route file and exporting those modules, but ultimately decided against it since it's really not all that much code.

const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Returns index.html
app.get("/", (req, res) => 
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Returns notes.html
app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Read db.json file and return all saved notes as JSON
app.get("/api/notes", (req, res) => 
  res.json(db)
);

// Receive new note to save on requested body. Add to db.json file and return new note to slient
app.post("/api/notes", (req, res) => {
  let notesArray = path.join(__dirname, '/db/db.json')

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    // Vanilla js function to pull miliseconds since January 1, 1970, giving each note a unique ID. The only exception being if you made 2 notes within 1 milisecond, which theoretically shouldn't happen in this application
    id: Date.now()
  };

  db.push(newNote);
  fs.writeFile(notesArray, JSON.stringify(db), function (error) {
    if(error) {
      return console.log(error)
    } else {
      console.log(newNote.title + ' note saved succesfully!')
    }
  });
  res.json(newNote);
});

// Remove specified note from db.json file based on id, rewrite notes to db.json file
app.delete("/api/notes/:id", (req, res) => {
  let notesArray = path.join(__dirname, '/db/db.json')

  for (let i=0; i < db.length; i++) {
    if (db[i].id == req.params.id) {
      db.splice(i, 1);
      break;
    }
  }

  fs.writeFileSync(notesArray, JSON.stringify(db), function (error) {
    if(error) {
      return console.log(error)
    } else {
       console.log('Note deleted succesfully!') // This isn't logging and I'm not sure why, it works in lines 48-49
    }
  });
  res.json(db);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);