const requireAuth = require('../middleware/sessionController')
const express = require('express')

const {jobCreationController} = require('../controllers/jobCreationController')
const { jobInfoController } = require('../controllers/jobInfoController')
const { jobsListController } = require('../controllers/jobsListController')
const {getJobLocation} = require('../controllers/apiController')
const {jobFilterByCategoryController} = require('../controllers/jobFilterByCategoryController')
const {jobFilterByDatesController} = require('../controllers/jobFilterByDatesController')
const {jobFilterByLocationController} = require('../controllers/jobFilterByLocationController')



const jobInfoControl = new jobInfoController()
const jobsListControl = new jobsListController()
const jobCreationControl = new jobCreationController()
const jobFilterByCategoryControl = new jobFilterByCategoryController()
const jobFilterByDatesControl = new jobFilterByDatesController()
const jobFilterByLocationControl = new jobFilterByLocationController()
const router = express.Router()

//returns job information for a specific job listing
//requires jobListing id only, from URL
router.get('/getJobInformation/:jobListingID', jobInfoControl.handleGetJobListingByID)

//returns information on all jobs
router.get('/displayAllJobs', jobsListControl.handleGetAllJobListings)

//filters the jobs by location
router.get('/getJobLocation', jobFilterByCategoryControl.handleFilter)

//filters the jobs by category
router.get('/getJobCategory', jobFilterByDatesControl.handleFilter)

//filters the jobs by date
router.get('/getJobDate', jobFilterByLocationControl.handleFilter)


//to protect certain routes (login only)
router.use(requireAuth)

//creates a job listing
//creates session cookie, jobTitle, jobDescription, totalPay, startDateTime, endDateTime, postalCode, reqNumberOfWorkers
router.post('/createJobListing', jobCreationControl.handleJobCreation)


//router.post('/deleteJobListing', deleteJobListing)




module.exports = router