const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data -- DO I NEED THIS? WHERE? 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



//TODO: Create HTML ROUTE: GET * should return the index.html file.
// Create a route for the index.html file
app.get("/", (req, res) => {
    // Send the index.html file as a response
    res.sendFile(__dirname + "/public/index.html");
});

//TODO: Create HTML ROUTE: GET /notes should return the notes.html file.
// Create a route for the notes.html file
app.get('/notes', (req, res) => {
  // Send the notes.html file as a response
  res.sendFile(__dirname + '/public/notes.html');
});


// Start the server
// app.listen(port, () => console.log(`Listening on port ${port}`));

//TODO: Create API Route: GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    // read the db.json file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      // parse the data and return all saved notes
      const notes = JSON.parse(data);
      res.json(notes);
    });
  });


//TODO: Create API Route:POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

app.post('/api/notes', (req, res) => {
  console.log(req.body);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) throw err;
  
      // parse the data and return all saved notes
      const oldNotes = JSON.parse(data);
      oldNotes.push({
        title:req.body.title,
        text:req.body.text, 
        id:uuidv4()
      });
    fs.writeFile('db/db.json', JSON.stringify(oldNotes, null, 4), (err)=>{
      if (err) throw err; 
      res.json(oldNotes);
    })
    });
});
// working on delete... 
app.delete('/api/notes/:id', (req, res) => {
  let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  let newNotes = notes.filter(note => note.id !== req.params.id);
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  res.send('Note deleted!');
});

// console.log(req.params.id);


// Start the server
app.listen(port, () => console.log("Server started at port 3001"));