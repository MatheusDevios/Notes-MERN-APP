require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let mongodbURL = process.env.REACT_APP_URL;

// mongoose.connect(mongodbURL);
mongoose.connect("mongodb://127.0.0.1:27017/dataNotes");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Note = mongoose.model("Note", noteSchema);

app.post("/create", (req, res) => {
  console.log(req.body);
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote.save((error) => {
    if (!error) {
      res.send("Succesfully added new Note!");
    } else {
      console.log("error saving Note: ", error);
    }
  });
});

app.get("/notes", (req, res) => {
  Note.find({}, (err, notes) => {
    if (!err) {
      res.send(notes);
    } else {
      console.log("error getting notes: ", err);
    }
  });
});

app.delete("/delete/:_id", (req, res) => {
  // console.log(req.params._id)
  Note.deleteOne({ _id: req.params._id }, (error) => {
    if (!error) {
      res.send("Succesfully removed corresponding Note.");
    } else {
      console.log("error removing note: ", error);
    }
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3001.");
});
