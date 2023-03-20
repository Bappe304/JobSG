const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    jobCreatorID:{
        type: String,
        required: true
    },
    workerID:{
        type: String,
        required: true
    },
    messages:{
        type: Array,
        required: true
    }
    

}, {timestamps: true})


module.exports = mongoose.model('Chat', chatSchema)