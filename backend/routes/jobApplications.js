const express = require('express')
const {
    addJobtoDB} = require('../controllers/jobApplicationController')

    const router = express.Router()

    //get all job applications
    router.get('/allJobs', (req,res)=>{
        res.json({msg:"get all Jobs"})
    })

    
    //add a new job profile
    router.post('/', addJobtoDB)


    module.exports = router