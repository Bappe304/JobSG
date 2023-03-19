const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobAppSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },

    //Working period range
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        rewuired: true
    },
    relevantDocuments: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: String,
        required: false
    }

}, {timestamps: true})

module.exports = mongoose.model('JobApplication', jobAppSchema)
