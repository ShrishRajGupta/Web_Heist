const express = require(`express`);
const app= express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");
const Register = require("./models/register");
const async = require("hbs/lib/async");

const port = process.env.PORT || 3000;
const static_path =path.join(__dirname, "../public")
const template_path =path.join(__dirname, "../templates/views")
const partials_path =path.join(__dirname, "../templates/partials")

app.use(express.json());
app.use(express.static(static_path))
app.use(express.urlencoded({extended:false}))
// view engine setup
app.set("view engine", "hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path);



app.get("/",function(req,res){
    res.render("index")
})
app.get("/register",function(req,res){
    res.render("index")
})

app.post("/register", async function(req,res){
    try {
        const password = req.body.password;
       const cpassword = req.body.confirmPassword;
       if(password=== cpassword){
            const registerUser = new Register({
                email:req.body.email,
                password: password,
                confirmPassword: cpassword
            })
            const registered = await registerUser.save();
            res.status(201).render("main");
       }else{
        res.send("Password not matching");
       }
    } catch (error) {
        res.send(400).send(error);
    }
    // res.render("main")
})
app.get("/login",function(req,res){
    res.render("index")
})
app.post("/login",async (req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const useremail=await Register.findOne({email:email})
        const valide= await bcrypt.compare(password,useremail.password);

        if(valide){
            res.status(201).render("main");
        }
        else{
            res.send(`Invalid credentials`)
        }

    } catch (error) {
        res.send(400).send(`Invalid credentials`);
    }
})
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})