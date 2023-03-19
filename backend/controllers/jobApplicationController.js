const AddJob = require('../models/jobApplicationModel')
const mongoose = require('mongoose')

const { collection } = require('mongodb')

const addJobtoDB  = async (req, res)=>{
    const {firstName, lastName, emailAddress, phoneNumber, age, startDate, endDate, relevantDocuments} = req.body

    let emptyFields = []
    if(!firstName) emptyFields.push('firstName')
    if(!lastName) emptyFields.push('lastName')
    if(!emailAddress) emptyFields.push('emailAddress')
    if(!phoneNumber) emptyFields.push('phoneNumber')
    if(!age) emptyFields.push('age')
    if(!startDate) emptyFields.push('startDate')
    if(!endDate) emptyFields.push('endDate')
    if(!relevantDocuments) emptyFields.push('relevantDocuments')
    
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }

    try{
        const add = await AddJob.create({firstName,lastName,emailAddress,phoneNumber,age,startDate,endDate,relevantDocuments})
        res.status(200).json(add)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

const updatejobDetails = async(req,res)=> {
    const {jobApplicationID} = req.body
    if(!mongoose.Types.ObjectId.isValid(jobApplicationID))
    {
        return res.status(400).json({error: "Account does not exist"})
    }

    
}





module.exports={
    addJobtoDB
}




