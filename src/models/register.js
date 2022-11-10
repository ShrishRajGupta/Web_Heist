const bcrypt = require('bcryptjs/dist/bcrypt');
const async = require('hbs/lib/async');
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})
clientSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
        this.confirmPassword=undefined;
    }
    next();
})
const Register = new mongoose.model("Register",clientSchema);

module.exports= Register;