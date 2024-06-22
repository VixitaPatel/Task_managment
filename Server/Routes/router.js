const express = require("express");
const app = express();

const controller = require('../Controller/controller');

const route = express.Router()
const cookieParser = require("cookie-parser");
app.use(cookieParser());



// // const { model } = require("mongoose");

route.get('/',controller.homepage);

route.get('/admin-login',controller.g_admin_login);
route.get('/member-login',controller.g_member_login);

route.post('/admin-login',controller.p_admin_login);
route.post('/member-login',controller.p_member_login);

route.get('/admin-registration',controller.g_admin_registration);
route.get('/member-registration',controller.g_member_registration);

route.post('/admin-registration',controller.p_admin_registration);
route.post('/member-registration',controller.p_member_registration);

route.get('/admin-profile', controller.g_admin_profile);
// route.get('/mem-profile', controller.g_mem_profile);

module.exports = route