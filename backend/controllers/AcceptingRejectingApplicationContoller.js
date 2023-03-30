const mongoose = require('mongoose')
const jobApplication = require('../models/jobApplicationModel')
const jwt = require('jsonwebtoken')

const Accepting = async function(req,res) {
    try{
        const {jobApplicationID} = req.body
        const  application = await jobApplication.findByIdAndUpdate(jobApplicationID, {status: "Accepted"})
        res.status(200).json(application)
    } catch(err){
        res.status(400).json({error: err.message})
    }
}


const Rejejcting = async function(req,res) {
    try{
        const {jobApplicationID} = req.body
        const application = await jobApplication.findByIdAndUpdate(jobAppllicationID,{status: "Rejected"})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}