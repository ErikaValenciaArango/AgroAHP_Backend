const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** @function userSchema */
// Schema in student for model

const userSchema = new Schema({
    /*id_user:{
        type: Number,
        required: true,
        trim: true, //Quita espacios
        unique: true
    },*/
    user_name:{
        type: String,
        required: true,
        trim: true
    },
    user_lastname:{
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    user_nickname:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    user_password:{
        type: String,
        required: true,
        trim: true
    },
    user_email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
},{timestamps: true});

module.exports = userSchema;
