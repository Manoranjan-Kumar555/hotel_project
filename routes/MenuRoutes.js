const express = require('express');
const router = express.Router();
const MenuItem = require("../models/Menu")

router.post("/", async (req, res) => {
    try {

        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        console.log("Data saved successfully");
        res.status(200).json(response);

    } catch (err) {
        console.log("Error :- ", err);
        res.status(500).json({ error: "Internal Server Error" })
    }
});


router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data fatching successfully");
        res.status(200).json(data);
    } catch (err) {
        console.log("Error :- ", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

router.get("/:testType", async(req, res) => {
    try{
        const testType = req.params.testType;
    if (testType == "spicy" || testType == "sweet" || testType == "sour") {
        const response = await MenuItem.find({ taste: testType });
        console.log("Response Fatching Work Type Sucessfully");
        res.status(200).send(response);
    }else{
        res.status(404).json({Error:"Invalid Work Type Please enter Correct!"})
    }
    }catch(err){
        console.log(err);
        res.status(500).json({Error:"Internal Server Error"})
    }
})

module.exports = router;