const express = require('express')
const {
    createAccount, 
    getAccountByID, 
    deleteAccountByID, 
    updateAccountByID,
    addJobApplicationByID,
    addJobListingByID,
    removeJobApplicationByID,
    removeJobListingByID} = require('../controllers/databaseController')

const {signUpAccount} = require('../controllers/signUpController')
const {loginAccount} = require('../controllers/loginVerifier')
const router = express.Router()

//login route
router.post('/login',loginAccount)

//signup route
router.post('/signup',signUpAccount)

//get single account
router.get('/:id', getAccountByID)

//create new account
router.post('/',createAccount)

//delete an account
router.delete('/:id',deleteAccountByID)

//update an account
router.patch('/:id', updateAccountByID)

//testing purposes
router.delete('/:id',removeJobListingByID)

router.patch('/:id', addJobListingByID)

module.exports = router