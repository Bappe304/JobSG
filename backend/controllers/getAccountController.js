const mongoose = require('mongoose')
const Account = require('../models/AccountModel')
const jobApplicationModel = require('../models/jobApplicationModel')
const {AccountObserver}  = require('../observers/AccountObserver')



//get specific job listing
class getAccountController extends AccountObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetAccount = this.handleGetAccount.bind(this)
    }
    async update(req){
        console.log('hi1')
        let account = await Account.getAccount(req)
        console.log('hi2')
        let updatedAccount = JSON.parse(JSON.stringify(account))
        console.log('hi4')
        let link = await jobApplicationModel.getAllJobsAppliedFor(req)
        console.log('hi6')        
        let jobsAppliedFor =  JSON.parse(JSON.stringify(await jobApplicationModel.getAllJobsAppliedFor(req)))
        console.log('hi5')
        updatedAccount["jobsAppliedFor"] = jobsAppliedFor
        console.log('hi3')
        return updatedAccount
    }
    async handleGetAccount (req,res){
        try{
            const account = await this.update(req)
            
            res.status(200).json(account)
        } catch(error){
            res.status(400).json({error:error.message})
        }
        
    }


}

module.exports = {getAccountController}
