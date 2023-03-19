const Account = require('../models/AccountModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}



//signup user
const signUpAccount = async function (req,res) {
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
    try{
        const account = await Account.signUp(firstName, lastName, password, emailAddress, phoneNumber,age,gender)
        //create a token
        const token = createToken(account._id)
        res.status(200).json({firstName, lastName, password, emailAddress, phoneNumber,age,gender,token})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signUpAccount}