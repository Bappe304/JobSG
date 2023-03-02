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

const router = express.Router()

//get all accounts
router.get('/', (req,res) =>{
    res.json({msg:"get all accounts"})
})

//get single account
router.get('/:id', getAccountByID)

//create new account
router.post('/',createAccount)

//delete an account
router.delete('/:id',deleteAccountByID)

//update an account
router.patch('/:id', updateAccountByID)

//testing purposes
router.delete('/',removeJobListingByID)
router.patch('/', addJobListingByID)

module.exports = router