const multer = require('multer') 

//Storage for profile picture
const Storage = multer.diskStorage({
    destination: "newuploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const uploadPP = multer({
    storage: Storage
}).single('ProfilePicture')

module.exports = {uploadPP}