const mongoose = require('mongoose')

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
        required: true
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
    jobListings:{
        type: Array,
        required: true
    },
    jobApplications:{
        type: Array,
        required: true

    },
    profilePicture:{
        type: String
    }

}, {timestamps: true})

module.exports = mongoose.model('Account', accountSchema)