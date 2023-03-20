const Account = require('../models/AccountModel')
const mongoose = require('mongoose')

const createAccount = async (req,res)=>{
    const {firstName, lastName, password, emailAddress, phoneNumber,age,gender} = req.body
    //list of all missing values in form to return appropriate error message
    let emptyFields = []
    if(!firstName) emptyFields.push('firstName')
    if(!lastName) emptyFields.push('lastName')
    if(!password) emptyFields.push('password')
    if(!emailAddress) emptyFields.push('emailAddress')
    if(!phoneNumber) emptyFields.push('phoneNumber')
    if(!age) emptyFields.push('age')
    if(!gender) emptyFields.push('gender')
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }
    try{
        const account = await Account.create({firstName, lastName, password, emailAddress, phoneNumber,age,gender, jobListings, jobApplications})
        res.status(200).json(account)
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

const getAccountByID = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Account does not exist"})
    }
    const account = await Account.findById(id)
    if(!account){
        return res.status(400).json({error:"Account does not exist"})
    }
    res.status(200).json(account)
}

const deleteAccountByID = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Account does not exist"})
    }
    const account = await Account.findByIdAndDelete({_id:id})
    if(!account){
        return res.status(400).json({error:"Account does not exist"})
    }
    res.status(200).json(account)

}

const updateAccountByID = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:"Account does not exist"})
    }
    //prevent user from changing password / emailAddress
    delete req.body.password
    delete req.body.emailAddress
    const account = await Account.findByIdAndUpdate({_id:id},{...req.body})
    if(!account){
        return res.status(400).json({error:"Account does not exist"})
    }
    res.status(200).json(account)
}

const removeJobListingByID = async (req,res)=>{
    const {accountID, jobListingID} = req.body
    if(!mongoose.Types.ObjectId.isValid(accountID) || !mongoose.Types.ObjectId.isValid(jobListingID)){
        return res.status(400).json({error:"Account does not exist"})
    }
    let account = await Account.findById(accountID)
    if(!account){
        return res.status(400).json({error:"Account does not exist"})
    }
    const index = account.jobListings.indexOf(jobListingID)
    if(index == -1) return res.status(400).json({error:"User did not sign up for job listing!"})

    account.jobListings.splice(index,1)
    account = await Account.findByIdAndUpdate({_id:account._id},{"jobListings": account.jobListings})
    res.status(200).json(account)
    
    
}

const addJobListingByID = async(req,res)=>{
    const {accountID, jobListingID} = req.body
    if(!mongoose.Types.ObjectId.isValid(accountID) || !mongoose.Types.ObjectId.isValid(jobListingID)){
        return res.status(400).json({error:"Account does not exist"})
    }
    let account = await Account.findById(accountID)
    if(!account){
        return res.status(400).json({error:"Account does not exist"})
    }

    account.jobListings.push(jobListingID)
    account = await Account.findByIdAndUpdate({_id:account._id},{"jobListings": account.jobListings})
    res.status(200).json(account)

}

const removeJobApplicationByID = async(req,res)=>{
    const {accountID,jobListingID} = req.body
    if(!mongoose.Types.ObjectId.isValid(accountID) || !mongoose.Types.ObjectId.isValid(jobListingID)){
        return res.status(400).json({error:"Account does not exist"})
    }
    let account = await Account.findById(accountID)

}

const addJobApplicationByID = async(req,res) => {

}

module.exports= {
    createAccount,
    deleteAccountByID,
    getAccountByID,
    updateAccountByID,
    addJobApplicationByID,
    addJobListingByID,
    removeJobApplicationByID,
    removeJobListingByID

}