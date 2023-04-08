require('dotenv').config()
const express = require('express')
const accountsRoutes = require('./routes/accounts')
const jobListingsRoutes = require('./routes/jobListings')
const chatsRoutes = require('./routes/chats')
const applicationRoutes = require('./routes/jobApplications')
const mongoose = require('mongoose')
const uploadRoutes = require('./routes/PPUpload')
const NewTryRoutes = require('./routes/Pdfupload')

//setting up express app
const app = express()
let cors = require("cors");
app.use(cors());

//middleware -> to get access to req body
app.use(express.json())

//routes

app.use('/api/accounts', accountsRoutes)     //essentially calling localhost:4000/api/accounts
app.use('/api/jobListings', jobListingsRoutes)
app.use('/api/chat', chatsRoutes)
app.use('/api/application', applicationRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/PDF', NewTryRoutes)
//connecting to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("db connect success")
        console.log("listening on port " + process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})

