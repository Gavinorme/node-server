const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images" });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let something = [
    {
        id: 1, name: "Gavin", descript: "idk"
    },
    {
        id: 2, name: "Desmond", descript: "dang it"
    },
];

app.get("/api/something", (req, res) => {
    res.send(something);
})

app.listen(3000, () => {
    console.log("Listening");
});
