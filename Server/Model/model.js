const mongoose = require('mongoose');
const express = require('express');
const app = express();


const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
   
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    // enum: ['user', 'admin']
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  address: {
    type: String,
    required : true
  },
  Profile_image: Buffer,
  dateOfBirth: {
    type: Date
  },
  department: {
    type: String
  },
  
 
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Generate auth token
// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret');
//   return token;
// };


const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  
  status: {
    type: String,
    enum: ['incomplete', 'pending_review', 'completed'],
    default: 'incomplete'
  },
//   labels: {
//     type: [String]
//   },
  
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  completionDate: {
    type: Date
  },
  
  
}, {
  timestamps: true
});


const assignmentSchema = new mongoose.Schema({
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true
    },
    assignedAt: {
      type: Date,
      default: Date.now
    }
  });
  const User = mongoose.model('User', userSchema);
  const Task = mongoose.model('Task', taskSchema);
  const Assignment = mongoose.model('Assignment', assignmentSchema);

  module.exports = {User,Task, Assignment};
  