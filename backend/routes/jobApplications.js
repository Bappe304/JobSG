const express = require('express')
const requireAuth = require('../middleware/sessionController')
const jwt = require('jsonwebtoken')
const router = express.Router()

const {CreateJobApplicationController} = require('../controllers/CreateJobApplicationController')
const {updateJobApplicationController} = require('../controllers/updateJobApplicationController')
const {getAllJobApplicationsController} = require('../controllers/getAllJobApplicationsController')

const {getApplicationsByUserController} = require('../controllers/getApplicationsByUserController')

const createJobApplicationControl = new CreateJobApplicationController()
const updateJobApplicationControl = new updateJobApplicationController()
const getAllJobApplicationsControl = new getAllJobApplicationsController()

const getApplicationsByUserControl = new getApplicationsByUserController()

//protected routes
//all routes below this require session cookie (login) to access
router.use(requireAuth)


//create a job application
//require session cookie and account id
router.post('/createJobApplication', createJobApplicationControl.handleJobApplication)

//update a job application
//require session cookie, account id and job application id
router.post('/updateJobApplication/:id', updateJobApplicationControl.handleJobApplicationUpdate)

//get all the JobApplications
router.get('/getAllJobApplications', getAllJobApplicationsControl.handleGetAllJobApplications)

router.post('/getAllJobApplicationsForApplicant', getApplicationsByUserControl.handleGetAllJobApplications)

module.exports = router