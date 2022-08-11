const express=require('express');
//router - Routing middleware
var app=express()
app.use(express.json())
//ObjectId - Getting the objectid of the document in collections in DB
const ObjectId=require('mongoose').Types.ObjectId;
//getting the model
const {User}=require('../model/model');


//Read the data in the DB
app.get('/users',(req,res)=>{
    User.find((err,docs)=>{
        if(err===undefined){
            res.status(500).send({ errorMessage: "The users information could not be retrieved." })
        }
        res.send(docs)
})
})
//Read the particular data in DB using id
app.get('/users/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    User.findById(req.params.id,(err,docs)=>{
        if(err){
            res.status(404).send({ message: "The user with the specified ID does not exist." })
        }
        else{
            res.send(docs)
        }
    })
})
//Post the datas in DB
app.post('/users',(req,res)=>{
    if(req.body.name===undefined && req.body.email===undefined){
        res.status(400).send({ errorMessage: "Please provide name and email for the user." })
    }
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        prograd_id:req.body.prograd_id,
        squad:req.body.squad
    })
    newUser.save((err,docs)=>{
       if(err===undefined){
        res.status(500).send({ errorMessage: "There was an error while saving the user to the database" })
       }
       else{
        res.send(docs)
       }
    })
})
//update the datas using id
app.put('/users/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    const newUser={
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        prograd_id:req.body.prograd_id,
        squad:req.body.squad
    }
    if(req.body.name===undefined && req.body.email===undefined){
        res.status(400).send({ errorMessage: "Please provide name and email for the user." })
    }
    User.findByIdAndUpdate(req.params.id,{$set:newUser},{new:true},(err,docs)=>{
        if(err){
            res.status(500).send({ errorMessage: "The user information could not be modified." })
        }
        else{
            res.status(200).send(docs)
        }
    })
})
//Deleting the document based on id
app.delete('/users/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    User.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(err){
            res.status(500).send({ errorMessage: "The user could not be removed" })
        }
        else{
            res.send(docs)
        }
    })
})
module.exports=app;