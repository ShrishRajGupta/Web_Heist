const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/registerDB",{
}).then(()=>{
    console.log("db connection success")
}).catch((err)=>{
    console.log(err)
})

