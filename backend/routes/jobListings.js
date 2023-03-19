const express = require('express')
const {
    addJobListingByID,
    removeJobListingByID} = require('../controllers/databaseController')

    const router = express.Router()

    //get all the listed jobs
    router.get('/alltheListedJobs', (req,res)=>{
        res.json({msg:"get all the listed Jobs"})
    })


//add a job to the database
router.post('/', addJobListingByID)


//delete a job from the database
router.delete('/:id', removeJobListingByID)

