const mongoose = require('mongoose');
const express = require('express');
const app = express();
const session = require("express-session");

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
    // default: 'user',
    // enum: ['user', 'admin']
  },
//   contactNumber: {
//     type: String,
//     required: true,
//     trim: true
//   },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  address: {
    type: String,
    required : true
  },
  country: {
    type: String,
    required : true
  },
  city: {
    type: String,
    required : true
  },
  isAdmin: {
    type: Boolean,
    required : true,
    default : false
  },

  Profile_image: Buffer,
  dateOfBirth: {
    type: Date
  },
  
  
 
}, {
  timestamps: true
});

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   const user = this;

//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });

// Generate auth token
// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret');
//   return token;
// };


// const taskSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   dueDate: {
//     type: Date,
//     required: true
//   },
  
//   status: {
//     type: String,
//     enum: ['incomplete', 'pending_review', 'completed'],
//     default: 'incomplete'
//   },
// //   labels: {
// //     type: [String]
// //   },
  
//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'high'],
//     default: 'medium'
//   },
//   completionDate: {
//     type: Date
//   },
  
  
// }, {
//   timestamps: true
// });


const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    // required: true,
    trim: true
  },
  // dueDate: {
  //   type: Date,
  //   required: true
  // },
  
  status: {
    type: String,
    enum: ['incomplete', 'pending_review', 'completed'],
    default: 'incomplete'
  },
//   labels: {
//     type: [String]
//   },
  
  // priority: {
  //   type: String,
  //   enum: ['low', 'medium', 'high'],
  //   default: 'medium'
  // },
  // completionDate: {
  //   type: Date
  // },
  
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
    // assignedAt: {
    //   type: Date,
    //   default: Date.now
    // },
    
  },{
    timestamps: true
  });
  const User = mongoose.model('User', userSchema);
  // const Task = mongoose.model('Task', taskSchema);
  const Assignment = mongoose.model('Assignment', assignmentSchema);

  
// Set up Passport configuration
// passport.use(new LocalStrategy(Student.authenticate()));
// passport.serializeUser(Student.serializeUser());
// passport.deserializeUser(Student.deserializeUser());

// passport.use(new LocalStrategy(Admin.authenticate()));
// passport.serializeUser(Admin.serializeUser());
// passport.deserializeUser(Admin.deserializeUser());

// passport.use(new LocalStrategy(Faculty.authenticate()));
// passport.serializeUser(Faculty.serializeUser());
// passport.deserializeUser(Faculty.deserializeUser());

app.use(
	session({
	  name: "user-session", // Set a unique name for sessions
	  secret: "your-secret-key",
	  resave: false,
	  saveUninitialized: false,
	  // You can also specify additional session options here
	})
  );


  // app.use(require("connect-flash")());

// app.use(passport.initialize());
// app.use(passport.session());
  module.exports = {User, Assignment};
  