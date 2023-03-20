const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const accountSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String
    }
    //might add to array of job applications and jobs created

}, {timestamps: true})

//static signup

accountSchema.statics.signUp = async function(firstName, lastName, password, emailAddress, phoneNumber,age,gender){

    //validation
    if(!emailAddress || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(emailAddress)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    const exists = await this.findOne({emailAddress})
    if (exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({firstName, lastName, password:hash, emailAddress, phoneNumber,age,gender})
    return user

}

accountSchema.statics.login = async function(emailAddress,password){
    if(!emailAddress|| !password){
        throw Error('ALl fields must be filled')
    }
    console.log("hi")
    const user = await this.findOne({ emailAddress})

    if (!user){
        throw Error('Incorrect email')
    }
    console.log(user)
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}
module.exports = mongoose.model('Account', accountSchema)