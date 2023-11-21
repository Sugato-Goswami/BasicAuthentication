const mongooseone = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const UserSchema = mongooseone.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    createpassword: String,
    confirmpassword: String,
    creationtimestamp:Number,
    tokens:[{
        token: String,
    }]

});
UserSchema.pre('save', async function (next) {
    if (this.isModified('createpassword')) {
        this.createpassword = await bcrypt.hash(this.createpassword, 6);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 6);
    }
    next();
});
UserSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        console.log(process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log(token);
        return token;
        
    } catch(err){
        console.log(err);
    }
}

module.exports = mongooseone.model('User', UserSchema);


