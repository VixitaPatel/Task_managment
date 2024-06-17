const express = require("express");
const app = express();


const route = express.Router()






const controller = require('../Controller/controller');
// // const { model } = require("mongoose");

route.get('/',controller.homepage);
module.exports = route