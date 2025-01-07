const express = require('express');
const app = express();
const fs = require('fs');
const os = require('os');
const db = require("./db");


const bodyParser = require('body-parser');
app.use(bodyParser.json());



const { error } = require('console');

// const user = os.userInfo();
// console.log("Operating System :- ", os)
// console.log("File System :-   ", fs)
// console.log("User info :- ", user.username);



// fs.appendFile("greeting.txt", "Hi, this is a created file by: " + user.username + "!\n", (err, data) => {
//     if (err) {
//         console.log("Error :-", err);
//     }
//     console.log("File is Created :- ", data)
// });

app.get("/", (req, res) => {
    res.send("Hello Welcome to Our Hotel.!");
})



app.get("/chicken", (req, res) => {
    res.send("Hello This is your Order Chiken Briyani. whhhhh!");
})
app.get("/idli", (req, res) => {
    const idli_list = {
        "id": 1,
        "name": "reva Idli",
        "description": ["Wheat", "Rice", "Suger"],
        "Price": 50
    }
    res.send(idli_list);
})

// Import the router files

const personRouter = require("./routes/PersonRoutes")
const menuRouter = require("./routes/MenuRoutes")

app.use("/person", personRouter);
app.use("/menuitem", menuRouter);

app.listen(8000, () => {
    console.log("Server listening on port :- 8000 !");
})