var express = require('express'); 
var bodyParser = require('body-parser');

var app = express(); 

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
var notes = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
]

app.get("/api/notes", function(req, res) {
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With"); 
    console.log("GET: /api/notes", notes);
    res.send(notes);
});

app.post("/api/notes", function(req, res) {
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    notes.push(req.body);

    console.log("POST: /api/notes", notes);
    res.send(notes);
});

app.delete("/api/notes", function(req, res) {
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  
    console.log(req.body);
    notes = notes.filter((note) => note.text !== req.body.text);
  
    console.log("DELETE: /api/notes", notes);
    res.send(notes);
});

app.post("/api/notes/send-to-top", function(req, res) {
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  
    const moveThisIndexToTop = req.body.idx;
    console.log("moveThisIndexToTop", moveThisIndexToTop);
    const foundNote = notes[moveThisIndexToTop];
  
    notes.splice(moveThisIndexToTop, 1);
    notes.unshift(foundNote);
  
    console.log("POST: /api/notes/send-to-top", notes);
    res.send(notes);
});

app.listen(8080); 