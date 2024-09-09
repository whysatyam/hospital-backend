const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// hospital backend application

const users = [{
    name:"John",
    kidneys: [{
        healthy: false
    }]
}];

// shows us number of kidneys and how many of them are healthy and unhealthy
app.get("/", (req, res) => {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < numberOfKidneys; i++){
        if(johnKidneys[i].healthy == true){ 
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

// user can add healthy or unhealthy kidneys 
app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "done"
    })
})

// updates and makes all the kidneys healthy
app.put("/", (req, res) => {
    if (atLeastOneUnhealthyKidney()) { // when this func returns true , the if block code wil run
        for (let i = 0; i < users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
        }
        res.json({
            msg: "done"
        });
    } else {
        res.status(411).json({
            msg : "no unhealthy kidneys found"
        })
    }
})


// removes all the unhealthy kidneys
app.delete("/", (req, res) => {
    if (atLeastOneUnhealthyKidney()) { // when this func returns true , the if block code wil run
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy == true) {
                newKidneys.push({
                    healthy: true
                });
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "done"
        });
    } else {
        res.status(411).json({
            msg : "no unhealthy kidneys found"
        });
    }
});


// checks if there is an unhealthy kidney for delete method
function atLeastOneUnhealthyKidney() {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy == false) {
            return true; 
        }
    }
    return false;  
}


app.listen(port, function(){
    console.log(`app is listening to port ${port}`)
})