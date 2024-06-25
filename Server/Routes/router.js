const express = require("express");
const app = express();

const controller = require('../Controller/controller');

const route = express.Router()
const jwt = require("jsonwebtoken");
const session = require('express-session');
// var cookieParser = require('cookie-parser');
// app.use(cookieParser());
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
route.get('/mem-profile', controller.g_mem_profile);

route.get('/changepwdadmin', controller.g_changepwdadmin);
route.post('/changepwdadmin', controller.p_changepwdadmin);

route.get('/changepwdmem', controller.g_changepwdmem);
route.post('/changepwdmem', controller.p_changepwdmem);

// route.get('/forgetpwdadmin', controller.g_forgetpwdadmin);
// route.post('/varifyotpadmin', controller.p_varifyotpadmin);
// route.post('/newpassadmin', controller.p_newpassadmin);

route.get('/viewtask', controller.g_viewtask);

route.get('/assigntask', controller.g_assigntask);
route.post('/assigntask', controller.p_assigntask);

route.get('/pendingtask', controller.g_pendingtask);
route.get('/completedtask', controller.g_completedtask);

route.get('/pendingtaskmem', controller.g_pendingtask_mem);
route.get('/completedtaskmem', controller.g_completedtask_mem);


module.exports = route