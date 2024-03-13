const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const criteriaSchema = new Schema({
  criteria_name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  criteria_user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  criteria_important1: {
    type: String,
    required: true,
    trim: true
  },
  criteria_important2: {
    type: String,
    required: true,
    trim: true,
  },
  criteria_important3: {
    type: String,
    required: true,
    trim: true,
  },
  value1: {
    type: Number,
    required: true,
    min: 1,
    max: 9,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un número entero válido'
    }
  },
  value2: {
    type: Number,
    required: true,
    min: 1,
    max: 9,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un número entero válido'
    }
  },
  value3: {
    type: Number,
    required: true,
    min: 1,
    max: 9,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} no es un número entero válido'
    }
  },
  percentage: {
    type: [Number],
    required: true,
    validate: {
      validator: v => v.length === 3,
      message: 'percentage debe ser un vector 3x1'
    }
  }
}, { timestamps: true });

module.exports = criteriaSchema;
