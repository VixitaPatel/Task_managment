const express = require("express");
const dotenv=require("dotenv");
const morgan=require("morgan");
const bodyparser=require("body-parser");
const path=require("path"); 

const passport = require("passport");

const ejs = require('ejs');
const session = require('express-session');

const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');

const model = require('./Server/Model/model');

const connectDB=require("./Server/Database/connection");

dotenv.config({path : 'config.env'});
const app=express();

const PORT = 8000;
app.use(session({
    secret: 'your-secret-key', // Change this to a secure random key
    resave: false,
    saveUninitialized: true
  }));

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({extended : true}))
app.use(cookieParser());

app.set("view engine", "ejs")
app.use('/', require('./Server/Routes/router')); 

app.use(express.static(__dirname + '/Assets'));

const saltRounds = 10;


app.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});