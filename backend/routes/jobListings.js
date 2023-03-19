const requireAuth = require('../middleware/sessionController')
const express = require('express')

const {createJobListing} = require('../controllers/jobCreationController')
const { getJobListingByID, getAllJobListings } = require('../controllers/jobInfoController')
const router = express.Router()

//returns job information for a specific job listing
router.get('/getJobInformation/:jobListingID', getJobListingByID)

//returns information on all jobs
router.get('/displayAllJobs', getAllJobListings)


//to protect certain routes (login only)
router.use(requireAuth)
router.post('/createJobListing', createJobListing)
//router.post('/deleteJobListing', deleteJobListing)





module.exports = router