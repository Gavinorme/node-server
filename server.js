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

let player = [
    {
        id: 1, name: "Lebron James", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/lebron.jpeg", 
    },
    {
        id: 2, name: "Stephen Curry", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/lebron.jpeg", 
    },
    {
        id: 3, name: "Kevin Durant", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/lebron.jpeg", 
    },
    {
        id: 4, name: "Nkola Jokic", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/lebron.jpeg", 
    },
    {
        id: 5, name: "Damian Lillard", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/lebron.jpeg", 
    },
    {
        id: 6, name: "Kyrie Irving", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/lebron.jpeg", 
    },
];

app.get("/api/something", (req, res) => {
    res.send(player);
})

app.listen(3000, () => {
    console.log("Listening");
});
