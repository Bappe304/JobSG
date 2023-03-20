require('dotenv').config()
const express = require('express')
const accountsRoutes = require('./routes/accounts')
const jobListingsRoutes = require('./routes/jobListings')
const chatsRoutes = require('./routes/chats')
const mongoose = require('mongoose')

//setting up express app
const app = express()

//middleware -> to get access to req body
app.use(express.json())

//routes

app.use('/api/accounts', accountsRoutes)     //essentially calling localhost:4000/api/accounts
app.use('/api/jobListings', jobListingsRoutes)
app.use('/api/chat', chatsRoutes)

//connecting to db
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("db connect success")
        console.log("listening on port " + process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})

