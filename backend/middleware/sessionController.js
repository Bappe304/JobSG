const jwt = require('jsonwebtoken')
const Account = require('../models/AccountModel')
const requireAuth = async function (req,res,next) {
    //verify authentication
    const {authorization} = req.headers

    if (!authorization){
        return res.status(401).json({error: 'Authoriztion token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const{_id} = jwt.verify(token, process.env.SECRET)
        req.account = await Account.findOne({_id}).select('_id')
        next()

    }catch (error){
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth