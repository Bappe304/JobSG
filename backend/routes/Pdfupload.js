const express = require("express") 
const router = express.Router() 
const mongoose = require("mongoose") 
const multer = require("multer") 
const {
  GridFsStorage
} = require("multer-gridfs-storage") 

require("dotenv")
  .config() 

const mongouri = process.env.MONGO_URI 
try {
  mongoose.connect(mongouri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }) 
} catch (error) {
  handleError(error) 
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message) 
}) 

//creating bucket
let bucket 
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client 
  var db = mongoose.connections[0].db 
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  }) 

}) 

router.use(express.json()) 
router.use(express.urlencoded({
  extended: false
})) 

const Storage = new GridFsStorage({
  url: mongouri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname 
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket"
      } 
      resolve(fileInfo) 
    }) 
  }
}) 

const upload = multer({
  storage: Storage 
}) 

/*
    console.log("hi")
    router.get("/fileinfo/:filename", (req, res) => {
    const file = bucket
        .find({
        filename: req.params.filename
        })
        .toArray((err, files) => {
        if (!files  files.length === 0) {
            return res.status(404)
            .json({
                err: "no files exist"
            }) 
        }
        console.log("hi3")
        bucket.openDownloadStreamByName(req.params.filename)
            .pipe(res) 
        console.log("hi4")
        }) 
        
    }) 
*/

console.log("hi")
router.get("/fileinfo/:filename", (req, res) => {
    const file = bucket
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404)
            .json({
              err: "no files exist"
            });
        }
    })
      
      bucket.openDownloadStreamByName(req.params.filename)
      .pipe(res);
  }) 
  

router.post("/uploadPDF", upload.single("file"), (req, res) => {
  res.status(200)
    .send("File uploaded successfully") 
}) 



module.exports = router