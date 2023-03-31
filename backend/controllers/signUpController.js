const Account = require('../models/AccountModel')
const jwt = require('jsonwebtoken')
const {AccountObserver}  = require('../observers/AccountObserver')
const {createToken} = require('./tokenCreator')



class signUpController extends AccountObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    }
    async update(req){
        const {firstName, lastName, password, emailAddress, phoneNumber,age,gender} = req.body
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
        const account = await Account.signUp(firstName, lastName, password, emailAddress, phoneNumber,age,gender)
        return account
    }

    //signup user
    async handleSignUp(req,res) {
        try{
            const account = await this.update(req)
            //create a token
            const token = createToken(account._id)
            let accountID = account._id
            const firstName = account.firstName
            const lastName = account.lastName
            const password = account.password
            const emailAddress = account.emailAddress
            const phoneNumber = account.phoneNumber
            const age = account.age
            const gender = account.gender
            //testing purposes
            res.status(200).json({firstName, lastName, password, emailAddress, phoneNumber,age,gender,token, accountID})
        }catch (error){
            res.status(400).json({error: error.message})
        }
    }

}
module.exports = {signUpController}