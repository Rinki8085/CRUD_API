const express = require('express');
const mongoose = require('mongoose');
require("dotenv/config");
const User = require('./Model/user');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.get("/student",async (req, res)=>{
    const user = await User.find();
    res.json(user)
})

app.get("/student/:id",async (req, res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
})

app.get("/student/:age",async (req, res)=>{
    try{
        const user = await User.findByAge(req.params.age);
        res.json(user);
    }catch(err){
        console.log("Error"+err);
    }
})


app.patch("/update/:id", async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        user.username = req.body.username
        user.password = req.body.password
        const a1 = await user.save();
        res.json(a1);
    }catch(err){
        res.send("Error: " + err.message);
    }
})


app.post("/add_student",async (req, res)=>{
    try{
        const myUser = new User(req.body);
        await myUser.save();
        console.log(myUser)
        res.send(myUser)
    }catch(err){
        console.log("Error",err);
    }
}) 

app.delete("/delete/:id", async (req, res)=>{
    try{
        const user = await User.findByIdAndRemove(req.params.id);
        res.send('Successfully Deleted')
    }catch(err){
        res.send("Error: " + err.message);
    }
})


mongoose.connect(process.env.DG_CONNECTION_STRING,{
    useUnifiedTopology:true,
    useNewUrlParser:true
});
const con = mongoose.connection;
con.on("open",function(){
    console.log("Connected....");
});
var db;

app.listen(5000, () => {
    console.log("Server running on port 5000 ..... ");
})

// mongodb+srv://document:rk123456@cluster0.gfit3.mongodb.net/2nd_Project?retryWrites=true&w=majority