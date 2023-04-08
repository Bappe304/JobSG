const mongoose = require('mongoose')


let Schema = mongoose.Schema

const ppSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})



module.exports = mongoose.model('ProfilePicture', ppSchema)