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
        id: 2, name: "Stephen Curry", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/steph.jpeg", 
    },
    {
        id: 3, name: "Kevin Durant", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/kd.jpeg", 
    },
    {
        id: 4, name: "Damian Lillard", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/dame.jpeg", 
    },
    {
        id: 5, name: "Kyrie Irving", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/kyrie.jpeg", 
    },
    {
        id: 6, name: "Nkola Jokic", position: "Power Forward", team: "Lakers", nickname: "King James", skills: ["Strength, agility and high basketball intelligence"], img: "images/jokic.jpeg", 
    },
];

app.get("/api/player", (req, res) => {
    res.send(player);
});

app.post("/api/player", upload.single("img"), (req, res)=> {
    console.log("before");
    const result = validatePlayer(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const player = {
        _id: players.length + 1,
        name: req.body.name,
        position: req.body.position,
        team: req.body.team,
        nickname: req.body.nickname,
        skills: req.body.skills.split(","),
    };

    players.push(player);
    res.send(player);
    console.log("after");
});
console.log("before validate");
const validatePlayer = (player) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        position: Joi.string().min(3).required(),
        team: Joi.string().min(3).required(),
        nickname: Joi.string().min(3).required(),
        skills: Joi.allow(),
    });

    return schema.validate(player);
} 
console.log("after validate");

app.listen(3000, () => {
    console.log("Listening");
});
