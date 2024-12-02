const mongoose = require('mongoose');

// Define the schema
const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    // Removed enum validation
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    // Removed min and max validations for salary
  },
  date_of_joining: {
    type: Date,
    required: [true, 'Date of joining is required'],
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: 'Date of joining cannot be in the future'
    }
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    // Removed validations for length and requirement
  },
  created_at: {
    type: Date,
    default: Date.now,
    immutable: true // Ensures the created_at field cannot be changed
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update `updated_at` on modifications
employeeSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Create a model from the schema
module.exports = mongoose.model('Employee', employeeSchema);
