const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');
const port = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data -- DO I NEED THIS? WHERE? 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create HTML ROUTE: GET /notes should return the notes.html file.
// Create a route for the notes.html file
app.get('/notes', (req, res) => {
    // Send the notes.html file as a response
    res.sendFile(__dirname + '/notes.html');
  });


// Start the server
app.listen(port, () => console.log(`Listening on port ${port}`));


//TODO: Create HTML ROUTE: GET * should return the index.html file.
// Create a route for the index.html file
app.get("/", (req, res) => {
    // Send the index.html file as a response
    res.sendFile(__dirname + "/index.html");
});


// Start the server
app.listen(3000, () => console.log("Server started at port 3001"));


//TODO: Create API Route: GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', function(req, res) {
    // read the db.json file
    fs.readFile('db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      // parse the data and return all saved notes
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });


//TODO: Create API Route:POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
    // code to save note here
});

res.send(note);