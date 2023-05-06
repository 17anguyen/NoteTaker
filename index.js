const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001
const app = express();


//middleware
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            return console.log(err);
        } else {
            const addNote = JSON.parse(data);
            res.json(addNote);
        }
    })
});

app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json","utf-8",(err,data) => {
        if (err) {
            return console.log(err);
        } else{
            const addNote = JSON.parse(data),
            noteInput = {
                title: req.body.title,
                text: req.body.text,
            }
            addNote.push(noteInput);
            fs.writeFile("./db/db.json",JSON.stringify(noteList,null,4),(err) => {
                if (err) {
                    return console.log(err);
                } else {
                   return res.json(noteInput);
                }
            })
        }
    })
});

app.delete("/api/notes/:id", (req,res) => {
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if (err) {
            return console.log(err);
        }else{
            const noteList = JSON.parse(data);
            const newNoteList = noteList.filter(note => note.id !== req.params.id);

            fs.writeFile("./db/db.json",JSON.stringify(newNoteList,null,4),(err)=>{
                if(err){
                    return console.log(err);
                }else{
                    return res.json({msg:"Note has been deleted"});
                }
            })
        }
    })

});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})






app.listen(PORT, () => {
    console.log(`listening on port` + PORT);
});