var { User,Task, Assignemt } = require('../Model/model');


const path = require("path");

const express = require("express");
const app = express();
// const XLXS = require("xlsx");
// const ExcelJS = require("exceljs");
// const multer = require("multer");
// const validator = require('validator');
// const Storage = multer.diskStorage({
//     //destination for file
//     destination: function (request, file, callback) {
//         if (file) {
//             callback(null, './Assets/uploads/');
//         }
//     },

//     // destination:"./asserts/uploads/",

//     //add back to extension
//     filename: function (request, file, callback) {
//         if (file) {
//             callback(null, Date.now() + file.originalname);
//         }
//         else {
//             callback(null, "NA");
//         }
//     },
// });

// const upload = multer({
//     storage: Storage,
// });
// app.use(cookieParser());


// const saltRounds = 10;

exports.homepage = (req, res) => {
    res.render("user");
}