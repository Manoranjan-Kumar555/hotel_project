const express = require('express');
const router = express.Router();
const Person = require("../models/Person")



// POST request route to add a person
// router.post("/person", async (req, res) person person common hai  person ko delete kr denna hai

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        // now create a new person document using  the person mongoose models object
        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("Data saved successfully");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

// GET method for getting person details
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fatched successfully");
        res.status(200).json(data);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// extract the working Type from the Hostel Person
router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == "chef" || workType == "manager" || workType == "waiter") {
            const response = await Person.find({ work: workType });
            console.log("Response Fatching Work Type Sucessfully");
            res.status(200).send(response);
        } else {
            res.status(404).json({ Error: "Invalid Work Type Please enter Correct!" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Internal Server Error" })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidation: true
        })

        if (!response) {
            res.status(404).json({ Error: "Page Not Found" });
        }

        console.log("Data Updated Successfully, !");
        res.status(200).json({ response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Internal Server Error" })
    }
})

router.delete("/:id", async (req, res) =>{
    try{

        // Extract this person id from the URL parameter
        const personId = req.params.id; 

        // Assuming you have a Person Model
        const response = await Person.findByIdAndDelete(personId);

        // if User enter the Wrong id then give to this error
        if(!response){
            res.status(404).json({Error:"Person Not Found!"})
        }
        console.log("Data Deleted Successfully!");
        res.status(200).json({message:"Person deleted Successfully!"});

    }catch(err){
        console.log(err);
        res.status(500).json({ Error: "Internal Server Error" })
    }
})

module.exports = router;