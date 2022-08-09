const express = require("express");
const user = require("../models/LogScaleSchema");
const router = express.Router();

router.get('/', (req, res) =>{

    //checks if the id in the req exsists
    user.find({"_id": {$in: req.body.id}})
    .then((result)=>{
        if(Object.keys(result).length === 0){
            res.send("notfound")
            return;
        }
    })

    //retuns the object with id
    user.find({"_id":req.body.id})
    .then((result) => {
        res.send(result).status(200);
    })
    .catch((err) =>{
        res.send(err)
    })

});

router.post("/", (req,res) => {

    console.log(req.body);

    const post = new user({
        title: req.body.title,
        names: req.body.names,
        values: req.body.values,
        links: req.body.links
    });
    post.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    });
})

module.exports = router;