const express = require('express')
const router = express.Router()
const ppSchema = require('../models/ProfilepictureModel')
const ppUploadController = require('../controllers/ppUploadController')

router.post('/uploadProfilePicture', (req, res) => {
    ppUploadController.uploadPP(req, res, (err) => {
        if(err){
            console.log(err)
        }else{
            const NewPP = new ppSchema({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/jpg'
                }
        })
        NewPP.save()
        .then(()=> res.send('Profile Picture Uploaded'))
        .catch((err) => res.send(err))
        }
    })
})

module.exports = router