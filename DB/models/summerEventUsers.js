const mongoose = require('mongoose')
const validator = require('validator')

const summerEventUserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Phone number is invalid')
            }
        }
    },
    email:{
        type:String,
        required:false,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        trim: true
    },
    address:{
        type:String,
        required:false,
        trim: true
    },
    bill :{
        type:Buffer,
        required:false
    }
},{
    timestamps:true
})

const SummerEventUser =  mongoose.model('SummerEventUser',summerEventUserSchema, 'summer_event_users')

module.exports = SummerEventUser