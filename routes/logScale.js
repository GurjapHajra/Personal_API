const express = require("express");
const user = require("../models/LogScaleSchema");
const router = express.Router();

router.get('/', (req, res) =>{

    //checks if the title in the req exsists
    user.find({"title": {$in: req.body.title}})
    .then((result)=>{
        if(Object.keys(result).length === 0){
            res.send("notfound")
            return;
        }
    })

    //retuns the object with title
    user.find({"title":req.body.title})
    .then((result) => {
        res.send(result).status(200);
    })
    .catch((err) =>{
        console.log(err)
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
        res.sendStatus(err)
    });
})

module.exports = router;