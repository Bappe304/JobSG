const Account = require('../models/AccountModel')
const jwt = require('jsonwebtoken')
const {AccountObserver}  = require('../observers/AccountObserver')
const {createToken} = require('./tokenCreator')

//login user
class loginController extends AccountObserver{
    constructor(){
        super()
        this.update = this.update.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    async update(req){
        const {emailAddress, password} = req.body
        const account = await Account.login(emailAddress, password)
        return account
    }
    
    async handleLogin(req,res){
    try{
        const account = await this.update(req) 
        const token = createToken(account._id)
        let accountID = account._id
        let emailAddress = account.emailAddress
        res.status(200).json({emailAddress,token, accountID})

    } catch(error){
        res.status(400).json({error:error.message})
    }
}
}

module.exports = {loginController}
