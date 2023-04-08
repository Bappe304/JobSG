const express = require('express')


const {signUpController} = require('../controllers/signUpController')
const {loginController} = require('../controllers/loginController')
const {getAccountController} = require('../controllers/getAccountController')

const router = express.Router()

const signUpControl = new signUpController()
const loginControl = new loginController()
const getAccountControl = new getAccountController()

//login route - needs email address and password and will 
//returns a session cookie (so that user remains logged in)
router.post('/login',loginControl.handleLogin)

//signup route - needs all firstName, lastName, password, emailAddress, phoneNumber,age,gender 
//returns newly created Account with session cookie
router.post('/signup',signUpControl.handleSignUp)

router.get('/:accountID', getAccountControl.handleGetAccount)

/*
//get single account


//create new account
router.post('/',createAccount)

//delete an account
router.delete('/:id',deleteAccountByID)

//update an account
router.patch('/:id', updateAccountByID)

//testing purposes
router.delete('/:id',removeJobListingByID)

router.patch('/:id', addJobListingByID)
*/

module.exports = router