const express = require('express')
const requireAuth = require('../middleware/sessionController')
const jwt = require('jsonwebtoken')
const router = express.Router()

const {CreatejobApplicationController} = require('../controllers/createJobApplicationController')
const {updateJobApplicationController} = require('../controllers/updateJobApplicationController')
const {getAllJobApplicationsController} = require('../controllers/getAllJobApplicationsController')


const createJobApplicationControl = new CreatejobApplicationController()
const updateJobApplicationControl = new updateJobApplicationController()
const getAllJobApplicationsControl = new getAllJobApplicationsController()

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

module.exports = router