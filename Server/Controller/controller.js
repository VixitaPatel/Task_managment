var { User, Task, Assignemt } = require('../Model/model');


const path = require("path");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
const otpGenerator = require('otp-generator');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const saltRounds = 10;

app.use(session({
    secret: 'your-secret-key', // Change this to a secure random key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));


exports.homepage = (req, res) => {
    res.render("user");
}

exports.g_admin_login = (req, res) => {
    res.render("Admin/adminlogin.ejs");
}

exports.g_member_login = (req, res) => {
    res.render("Member/memberlogin.ejs");
}

exports.g_admin_registration = (req, res) => {
    res.render("Admin/adminreg.ejs");
}

exports.g_member_registration = (req, res) => {
    res.render("member/memberreg.ejs");
}

exports.p_admin_registration = async (req, res) => {
    try {
        const hashedPassward = await bcrypt.hash(req.body.password, 8);

        const newuser = new User({

            name: req.body.name,
            email: req.body.email,
            password: hashedPassward,
            dateOfBirth: req.body.date,
            role: req.body.role,
            gender: req.body.gender,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            isAdmin: true
        })
        await newuser.save();
        res.redirect("/admin-login");

    } catch (err) {
        console.error(err);
        // Handle the error appropriately, such as sending an error response to the client or logging it.
    }

}

exports.p_member_registration = async (req, res) => {
    try {
        const hashedPassward = await bcrypt.hash(req.body.password, 8);

        const newuser = new User({

            name: req.body.name,
            email: req.body.email,
            password: hashedPassward,
            dateOfBirth: req.body.date,
            role: req.body.role,
            gender: req.body.gender,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            isAdmin: false
           
        })
        console.log("falseeeeeee");
        console.log(newuser);
        await newuser.save();
        console.log("sucess");
        res.redirect("/member-login");

    } catch (err) {
        console.error(err);
        // Handle the error appropriately, such as sending an error response to the client or logging it.
    }

}

// exports.p_admin_login = async (req, res) => {
//     try {
//         // check if the user exists
//         const user = await User.findOne({ email: req.body.email });
//         if (user) {
//             //check if password matches
//             const result = await bcrypt.compare(req.body.password, user.password);
//             // const result = await req.body.f_password === user.Password;

//             if (result) {
//                 const secret = "ad123";
//                 const token = await jwt.sign({ "name": user.name, "email": user.email }, secret);
//                 console.log(token);
//                 res.cookie("jwtoken", token, {
//                     expires: new Date(Date.now() + 25892000000),
//                     httpOnly: true
//                 });
//                 // const stored_token = req.cookies.jwtoken;

//                 // console.log(stored_token);

//             //    console.log(a_jwtoken);
//                 console.log(user);
//                 res.render("Admin/admin_sidenav",{user});
//             } else {
//                 console.log("not match");
//                 // const title = "ERROR";
//                 // const message = "Password does not match!";
//                 // const icon = "error";
//                 // const href = "/facultylogin";
//                 res.redirect("/admin-login");
//             }
//         } else {
//             console.log("not exist");
//             // const title = "ERROR";
//             // const message = "Password does not match!";
//             // const icon = "error";
//             // const href = "/facultylogin";
//             res.redirect("/admin-login");
//         }
//     } catch (err) {
//         res.status(400).json({ err });
//     }
// }
exports.p_admin_login = async (req, res) => {
    try {
        console.log("why");
        const user = await User.findOne({ email: req.body.email });
        console.log("did you ?");
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);

            if (result) {
                const secret = "ad123";
                const token = jwt.sign({ name: user.name, email: user.email }, secret);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                console.log("vinit");
                res.render("Admin/admin_sidenav", { user });
            } else {
                console.log("helli");
                console.log("not match");
                res.redirect("/admin-login");
            }
        } else {
            console.log("mehta");
            console.log("not exist");
            res.redirect("/admin-login");
        }
    } catch (err) {
        res.status(400).json({ err });
    }
}

exports.p_member_login = async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            // const result = await req.body.f_password === user.Password;

            if (result) {
                const secret = "mem123";
                const token = await jwt.sign({ "name": user.name, "email": user.email }, secret);
                console.log(token);
                // console.log(token);
                // console.log("TTT");
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                // console.log("HHH");

                // const stored_token = req.cookies.f_jwtoken;

                // console.log(stored_token);
                // console.log("KK");
                // const verify_one = jwt.verify(token, secret);
                // console.log(verify_one);
                console.log(user);
                res.render("Member/member_sidenav",{user});
            } else {
                console.log("not match");
                // const title = "ERROR";
                // const message = "Password does not match!";
                // const icon = "error";
                // const href = "/facultylogin";
                res.redirect("/member-login");
            }
        } else {
            console.log("not exist");
            // const title = "ERROR";
            // const message = "Password does not match!";
            // const icon = "error";
            // const href = "/facultylogin";
            res.redirect("/member-login");
        }
    } catch (err) {
        res.status(400).json({ err });
    }
}

// exports.g_mem_profile = async (req, res) => {
//     try {

//         const userId = req.query.userId;
//         console.log(userId);
//         // const userId = req.session.userId;

//         // Fetch user information from the database
//         const user = await User.findById(userId);
//         // const ID = req.body.stud_id;     //Student as a schema name?.populate('ProgramRegistered')
//         // const student = await Student.findOne(_id = req.user);
//         // const Student_token = req.cookies.jwtokenstudent;
//         // const verified_student = jwt.verify(Student_token, "sagar1");
//         // const email = verified_student.email_id;
//         // const student = await Student.find({ Email_id: email });
//         // const program = await Program.findById(student[0].ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');

//         // const program = await Program.findById(student.ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');
//          console.log(user);
//         res.render("Member/mem_profile.ejs", { user });

        
       

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// }
exports.g_admin_profile = async (req, res) => {
    try {
        console.log("Cookies: ", req.cookies);
        console.log("hii");
        if(!req.cookies.jwtoken)
            {
                console.log("not found token");
            }
        const admin_token = req.cookies.jwtoken;
        const verified_admin = jwt.verify(admin_token, "ad123");
        const email = verified_admin.email;
        const user = await User.find({ email: email });
        // const program = await Program.findById(student[0].ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');

        // const program = await Program.findById(student.ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');
        // console.log("ssssss");
        // console.log(program);
        // console.log("eeeee");
        console.log(user);
        res.render("Admin/admin_profile.ejs", { user });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
exports.g_mem_profile = async (req, res) => {
    try {
        console.log("Cookies: ", req.cookies);
        console.log("hii");
        if(!req.cookies.jwtoken)
            {
                console.log("not found token");
            }
        const mem_token = req.cookies.jwtoken;
        const verified_mem = jwt.verify(mem_token, "mem123");
        const email = verified_mem.email;
        const user = await User.find({ email: email });
        // const program = await Program.findById(student[0].ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');

        // const program = await Program.findById(student.ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');
        // console.log("ssssss");
        // console.log(program);
        // console.log("eeeee");
        console.log(user);
        res.render("Member/mem_profile.ejs", { user });

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.g_changepwdadmin = async (req, res) => {
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const email = verify_one.email;
        const user = await User.find({ email: email })
        res.render("Admin/changepwdadmin", { user });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

exports.p_changepwdadmin = async (req, res) => {
    try {
        console.log("helololoo");
        const stored_token = req.cookies.jwtoken;
        console.log(stored_token);
        const verify_one = jwt.verify(stored_token, "ad123");
        console.log(verify_one);
        const email = verify_one.email;

        const { oldpwd, newpwd, confirmpwd } = req.body;
        console.log(req.body);

        if (newpwd != confirmpwd)                   //new password  check strong
        {
            console.log("password not match");
            // const title = "ERROR";
            // const message = "New password and confirm password do not match!";
            // const icon = "error";
            // const href = "/changepwdadmin";
            // res.render("Admin/alert.ejs", { title, message, icon, href });

            return;
        }
        const user = await User.findOne({ email: email });

        const pwdinvalid = await bcrypt.compare(oldpwd, user.password);
        // const pwdinvalid = oldpwd === user.Password;
        console.log(oldpwd);
        console.log(user.password);
        if (!pwdinvalid) {
            console.log("password not correct");
            // const title = "ERROR";
            // const message = "Old Passward is incorrect!";
            // const icon = "error";
            // const href = "/changepwdadmin";
            // res.render("Admin/alert.ejs", { title, message, icon, href });

            return;
        }

        const hashedpwd = await bcrypt.hash(newpwd, saltRounds);
        user.password = hashedpwd;
        await user.save();
        console.log("sucessfully changed");

        // const title = "SUCCESS";
        // const message = "Password changed successfully!";
        // const icon = "success";
        // const href = "/adminhome";
        res.render("Admin/admin_sidenav", {user});

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}

exports.g_changepwdmem = async (req, res) => {
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const email = verify_one.email;
        const user = await User.find({ email: email })
        res.render("Member/changepwdmem", { user });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

exports.p_changepwdmem = async (req, res) => {
    try {
        console.log("helololoo");
        const stored_token = req.cookies.jwtoken;
        console.log(stored_token);
        const verify_one = jwt.verify(stored_token, "mem123");
        console.log(verify_one);
        const email = verify_one.email;

        const { oldpwd, newpwd, confirmpwd } = req.body;
        console.log(req.body);

        if (newpwd != confirmpwd)                   //new password  check strong
        {
            console.log("password not match");
            // const title = "ERROR";
            // const message = "New password and confirm password do not match!";
            // const icon = "error";
            // const href = "/changepwdadmin";
            // res.render("Admin/alert.ejs", { title, message, icon, href });

            return;
        }
        const user = await User.findOne({ email: email });

        const pwdinvalid = await bcrypt.compare(oldpwd, user.password);
        // const pwdinvalid = oldpwd === user.Password;
        console.log(oldpwd);
        console.log(user.password);
        if (!pwdinvalid) {
            console.log("password not correct");
            // const title = "ERROR";
            // const message = "Old Passward is incorrect!";
            // const icon = "error";
            // const href = "/changepwdadmin";
            // res.render("Admin/alert.ejs", { title, message, icon, href });

            return;
        }

        const hashedpwd = await bcrypt.hash(newpwd, saltRounds);
        user.password = hashedpwd;
        await user.save();
        console.log("sucessfully changed");

        // const title = "SUCCESS";
        // const message = "Password changed successfully!";
        // const icon = "success";
        // const href = "/adminhome";
        res.render("Member/member_sidenav", {user});

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}

exports.g_forgetpwdadmin = async (req, res) => {
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const email = verify_one.email;
        const user = await User.find({ email: email })
        const otp =otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
        req.session.otp = otp;
        req.session.save(); 

            // const hashedpwd = await bcrypt.hash(randomPass, saltRounds);
            // await Admin.findOneAndUpdate({ 'Email_id': req.body.a_email }, { 'Password': hashedpwd }, { new: true })

            let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.daiict.ac.in",
                port: 587,
                auth: {
                    user: '202101232@daiict.ac.in',
                    pass: 'pmqnqyndofccxhkk'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: '202101232@daiict.ac.in', // Sender's email address
                to: 'vixitabhalodiya@gmail.com',//'202101234@daiict.ac.in', // Recipient's email address
                subject: "OTP", // Subject of the email
                text: 'This is a test email sent from Node.js using Nodemailer.',
                html: `
            <h2> Here your OTP. </h2>
          
            <p> <b> OTP : </b> ${otp} </p> 
               
            `,
            };

            console.log("mail continue again");

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
                // const title = "SUCCESS";
                // const message = "Check your mail to access your new password";
                // const icon = "success";
                // const href = "/adminLogin";
                res.render("Admin/passotpadmin", {otp });
            })
        
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
exports.p_varifyotpadmin = async (req, res) => {
    try {
        console.log("varifyyyyyyy");
        const enteredOtp = req.body.otp;
        console.log(enteredOtp);

        if (!req.session.otp) {
            return res.status(400).send('OTP not found in session');
        }

        if (enteredOtp === req.session.otp) {
            // OTP is correct, proceed with password reset or other actions
            req.session.otp = null; // Clear OTP from session after verification
            // res.send('OTP verified successfully');
        } else {
            // res.status(400).send('Invalid OTP');
            console.log("doneeee");
        }
        res.render("Admin/newpwdadmin");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}

exports.p_newpassadmin = async (req, res) => {
    try {
        console.log("helololoo");
        const stored_token = req.cookies.jwtoken;
        console.log(stored_token);
        const verify_one = jwt.verify(stored_token, "ad123");
        console.log(verify_one);
        const email = verify_one.email;

        const newpawd = req.body.newpass;
        console.log(req.body);

        
        const user = await User.findOne({ email: email });

        
        const hashedpwd = await bcrypt.hash(newpwd, saltRounds);
        user.password = hashedpwd;
        await user.save();
        console.log("sucessfully changed");

        // const title = "SUCCESS";
        // const message = "Password changed successfully!";
        // const icon = "success";
        // const href = "/adminhome";
        res.render("Admin/admin_sidenav", {user});

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}


