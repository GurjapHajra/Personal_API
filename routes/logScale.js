const express = require("express");
const user = require("../models/LogScaleSchema");
const ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();

function isValidObjectId(id){
    
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

function sendData(identity,res){
        user.find({"_id":identity})
        .then((result) => {
            res.send(result).status(200);
        })
        .catch((err) =>{
            res.send(err)
        })
}

router.get('/:id', (req, res) =>{

    const {id} = req.params;

    //checks if the id in the req exsists
    if(isValidObjectId(id)){
        user.find({"_id": {$in: id}})
        .then((result)=>{
            if(Object.keys(result).length === 0){
                res.send("notfound")
            }else{
                sendData(id,res)
            }
        })
    }else{
        res.send("notfound")
    }
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