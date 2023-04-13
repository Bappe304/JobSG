const express = require('express')
const requireAuth = require('../middleware/sessionController')
const jwt = require('jsonwebtoken')
const router = express.Router()

const {CreateJobApplicationController} = require('../controllers/createJobApplicationController')
const {getPendingApplicantsController} = require('../controllers/getPendingApplicantsController')

const {getApplicationsByUserController} = require('../controllers/getApplicationsByUserController')

const createJobApplicationControl = new CreateJobApplicationController()
const getPendingApplicantsControl = new getPendingApplicantsController()

const getApplicationsByUserControl = new getApplicationsByUserController()

//protected routes
//all routes below this require session cookie (login) to access
router.use(requireAuth)


//create a job application
//require session cookie and account id
router.post('/createJobApplication', createJobApplicationControl.handleJobApplication)


//get all the JobApplications
router.get('/getAllJobApplications', getPendingApplicantsControl.handleGetAllJobApplications)

router.post('/getAllJobApplicationsForApplicant', getApplicationsByUserControl.handleGetAllJobApplications)

module.exports = router