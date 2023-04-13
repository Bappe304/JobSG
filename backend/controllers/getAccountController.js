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
        let account = await Account.getAccount(req)
        let updatedAccount = JSON.parse(JSON.stringify(account))
        let link = await jobApplicationModel.getAllJobsAppliedFor(req)    
        let jobsAppliedFor =  JSON.parse(JSON.stringify(await jobApplicationModel.getAllJobsAppliedFor(req)))
        updatedAccount["jobsAppliedFor"] = jobsAppliedFor
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
