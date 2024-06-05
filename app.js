const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/readUsers", async (req,res) => {
    let users = await userModel.find();
    res.render("read", {users});
})

app.get("/delete/:id", async (req,res) => {
    let deletedUser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/readUsers");
})

app.get("/edit/:id", async (req,res) => {
    let user = await userModel.findOne({_id: req.params.id}, );
    res.render("edit", {user});
})

app.post("/createUser", async (req,res)=> {
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        email,name,image,
    });
    
    res.redirect("/readUsers");
})

app.post("/editUser/:id", async (req,res)=> {
    let {name, email, image} = req.body;

    let editedUser = await userModel.findOneAndUpdate({_id: req.params.id},{name,email,image},{new:true});
    
    res.redirect("/readUsers");
})


app.listen(3000);