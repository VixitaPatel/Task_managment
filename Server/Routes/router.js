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

route.get('/updateadmin', controller.g_updateadmin);  
route.post('/updateadmin', controller.p_updateadmin);

route.get('/updatemember', controller.g_updatemember);
route.post('/updatemember', controller.p_updatemember);

route.get('/changepwdadmin', controller.g_changepwdadmin);
route.post('/changepwdadmin', controller.p_changepwdadmin);

route.get('/changepwdmem', controller.g_changepwdmem);
route.post('/changepwdmem', controller.p_changepwdmem);

route.get('/forgetpwdadmin', controller.g_forgetpwdadmin);
route.post('/forgetpwdadmin', controller.p_forgetpwdadmin);
route.post('/varifyotpadmin', controller.p_varifyotpadmin);
route.post('/newpassadmin', controller.p_newpassadmin);

route.get('/forgetpwdmember', controller.g_forgetpwdmember);
route.post('/forgetpwdmember', controller.p_forgetpwdmember);
route.post('/varifyotpmember', controller.p_varifyotpmember);
route.post('/newpassmember', controller.p_newpassmember);

route.get('/viewtask', controller.g_viewtask);     //done

route.get('/assigntask', controller.g_assigntask);   //done
route.post('/assigntask', controller.p_assigntask);     //done

route.get('/pendingtask', controller.g_pendingtask);     // done
route.get('/completedtask', controller.g_completedtask);   //done


route.get('/varifytask', controller.g_varifytask);  
route.post('/varifytask', controller.p_varifytask);

route.get('/viewtaskmem', controller.g_viewtask_mem);      //done
route.get('/pendingtaskmem', controller.g_pendingtask_mem);   // done but not display
route.post('/pendingtaskmem', controller.p_pendingtask_mem);  //done
route.get('/completedtaskmem', controller.g_completedtask_mem);   // done

route.get('/logoutadmin', controller.logoutadmin);
route.get('/logoutmember', controller.logoutmember);


module.exports = route