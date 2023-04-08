const mongoose = require('mongoose')
const Account = require('../models/AccountModel')
const {AccountObserver}  = require('../observers/AccountObserver')



//get specific job listing
class getAccountController extends AccountObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleGetAccount = this.handleGetAccount.bind(this)
    }
    async update(req){
        console.log("wa")
        const account = await Account.getAccount(req)
       return account
    }
    async handleGetAccount (req,res){
        try{
            const account = await this.update(req)
            res.status(200).json(account)
        } catch(error){
            res.status(400).json({error:error.message})
        }
        
    }
    /*
    async handleGetAllJobListings (req,res){
        try{
            const jobListing = await JobListing.getAllJobListings(req)
            res.status(200).json(jobListing)
        } catch(error){
            res.status(400).json({error:error.message})
        }
    }
    */

}

module.exports = {getAccountController}