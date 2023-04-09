const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const accountSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    profilePicture:{
        type: String
    }
    //might add to array of job applications and jobs created

}, {timestamps: true})

//static signup

accountSchema.statics.signUp = async function(req){
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
            throw Error("Please fill in all fields " + emptyFields)
        }
        if (firstName.length < 2 || firstName.length > 80){
            throw Error("First Name must be between 2 and 80 characters!")
        }
        if (lastName.length < 2 || firstName.length > 80){
            throw Error("Last Name must be between 2 and 80 characters!")
        }


        if (/[^a-zA-Z]/.test(firstName)){
            throw Error("First Name can only contain alphabets!")
        }

        if (/[^a-zA-Z]/.test(lastName)){
            throw Error("Last Name can only contain alphabets!")
        }
        
        if(phoneNumber.match(/^[0-9]+$/) == null){
            throw Error("Phone number can only contain digits")
        }
        if (phoneNumber.length != 8){
            throw Error("Phone number should have 8 digits")
        }


    //validation
    if(!emailAddress || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(emailAddress)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough. Strong password should have at least one uppercase character, one lowercase character, one symbol, one number and a minimum length of 8')
    }
    const exists = await this.findOne({emailAddress})
    if (exists){
        throw Error('Email address already registered with an account')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = await this.create({firstName, lastName, password:hash, emailAddress, phoneNumber,age,gender})
    return user

}

accountSchema.statics.login = async function(emailAddress,password){

    if(!emailAddress|| !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(emailAddress)){
        throw Error('Email is not valid')
    }
    const user = await this.findOne({ emailAddress})

    if (!user){
        throw Error('Invalid email address or password')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Invalid email address or password')
    }
    
    return user
}

accountSchema.statics.getName = async function(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw Error("Account does not exist")
    }
    const user = await this.findOne({_id:id})
    if(!user){
        throw Error("Account does not exist")
    }
    return user['firstName'] + ' ' + user['lastName']
}

accountSchema.statics.getAccount = async function(req){
    const {accountID} = req.params
    if(!mongoose.Types.ObjectId.isValid(accountID)){
        throw Error("Account does not exist")
    }
    let account = await this.findById(accountID)
    if(!account){
        throw Error("Account does not exist")
    }
    return account
}
module.exports = mongoose.model('Account', accountSchema)