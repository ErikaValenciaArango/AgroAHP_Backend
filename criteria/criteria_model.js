const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** @function criteriaSchema */
// Schema in student for model

const criteriaSchema = new Schema({

    compound:{
        type: String,
        required: true,
        trim: true
    },
    cost:{
        type: String,
        required: true,
        trim: true,
    },
    environment_impact:{
        type: String,
        required: true,
        trim: true,
    },
    availability:{
        type: String,
        required: true,
        trim: true
    },

},{timestamps: true});

module.exports = criteriaSchema;
