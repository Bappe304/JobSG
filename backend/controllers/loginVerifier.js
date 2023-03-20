const Account = require('../models/AccountModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginAccount = async function(req,res){
    const {emailAddress, password} = req.body
    try{
        const account = await Account.login(emailAddress, password)

        const token = createToken(account._id)
        let accountID = account._id
        res.status(200).json({emailAddress,token, accountID})

    } catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {loginAccount}