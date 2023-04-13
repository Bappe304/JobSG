const Account = require('../models/AccountModel')
const jwt = require('jsonwebtoken')
const {AccountObserver}  = require('../observers/AccountObserver')


class editAccountController extends AccountObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleEditAccount = this.handleEditAccount.bind(this)
    }
    async update(req){
        try{
            const account = await Account.editAccount(req)
            return account
        } catch(error){
            throw error;
        }
        
    }

    //signup user
    async handleEditAccount(req,res) {
        try{

            const account = await this.update(req)
            let accountID = account._id
            const firstName = account.firstName
            const lastName = account.lastName
            const password = account.password
            const emailAddress = account.emailAddress
            const phoneNumber = account.phoneNumber
            const age = account.age
            const gender = account.gender
            res.status(200).json({firstName, lastName, password, emailAddress, phoneNumber,age,gender, accountID})
        }catch (error){
            
            res.status(400).json({error: error.message})
        }
    }

}
module.exports = {editAccountController}
