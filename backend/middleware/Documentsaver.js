const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose')

//Create a new instance of GridFsStorage to store upload files in MongoDB
const storage = new GridFsStorage({
    url:'mongodb+srv://',
    file: (req,file) => {
        return {
            filename: file.originalname,
            metadata: req.body
        }
    }
})


//Create a middleware function using multer and GridFsStorage
const upload = multer({
    storage: storage,
}).single('pdfFile')


//Create a function to retrieve a file from GridFs using its ID
const getFile = (fileID, res) => {
    const gfs = Grid(mongoose.connection.db, mongoose.mongo)
    const readstream = gfs.createReadStream({_id: fileID})
    readstream.pipe(res);
}

module.exports = {upload, getFile}