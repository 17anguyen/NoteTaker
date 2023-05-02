const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001
const app = express();
//middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf-8", (err, data) => {
        if {
            const notes = JSON.parse(data);
            res.json(notes);
            console.log("notes saved")
        } else {
            return res.status(404).json("page not found")
        }
    })
})

app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf-8", (err, data) => {
        if (err) {
            res.status(404).json("page not found");
        } else {
            const addNote = JSON.parse(data);
            const noteInput = {
                title: req.body.title,
                text: req.body.text,
                id: (Math.floor(Math.random() * 1000))
            }
            addNote.push(noteInput);
            fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(addNote, null, 4), (err) => {
                if (err) {
                    res.status(404).json("page not found");
                } else {
                    res.json({
                        msg: "Notes saved",
                        note: noteInput
                    })
                }
            })
        }
    })
})


app.listen(PORT, () => {
    console.log(`listening on port` + PORT);
});