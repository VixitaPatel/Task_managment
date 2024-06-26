var { User, Assignment } = require('../Model/model');


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
        const user = await User.findOne({ email: req.body.email  , isAdmin : true});
        if(user)
            {
                console.log("already exists");
                res.redirect("admin-registration");
            }
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
        const user = await User.findOne({ email: req.body.email  , isAdmin : false});
        if(user)
            {
                console.log(user);
                console.log("already exists");
                res.redirect("admin-registration");
                return;
            }
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
        if (user && user.isAdmin==true) {
            console.log("yesss");
            const result = await bcrypt.compare(req.body.password, user.password);

            if (result) {
                const secret = "ad123";
                const token = jwt.sign({ name: user.name, email: user.email }, secret);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                console.log("vinit");
                res.render("Admin/admin_profile", { user });
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
        if (user && user.isAdmin==false) {
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
                res.render("Member/mem_profile",{user});
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
        const user = await User.findOne({ email: email });
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
        const user = await User.findOne({ email: email });
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
        const user = await User.findOne({ email: email })
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

            res.redirect("changepwdadmin");
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

            res.redirect("changepwdadmin");
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
        res.redirect("admin-profile");

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
        const user = await User.findOne({ email: email })
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
            res.redirect("changepwdmem");
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
            res.redirect("changepwdmem");
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
        res.redirect("mem-profile");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}

exports.g_forgetpwdadmin = async (req, res) => {
    try {
        // const stored_token = req.cookies.jwtoken;
        // const verify_one = jwt.verify(stored_token, "mem123");
        // const email = verify_one.email;
        // const user = await User.find({ email: email })
        res.render("Admin/forgetpwdadmin");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
exports.p_forgetpwdadmin = async (req, res) => {
    try {
       
        const email = req.body.email;
        const user = await User.findOne({ email: email })
        console.log(user);
        if(!user)
             res.send("no match email");
        
        const otp =otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const secret = "ad123";
        const token = jwt.sign({ otp: otp, email: user.email }, secret);

        console.log("tokenn");
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
       
        console.log("generatedd");
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
           console.log(email);
            const mailOptions = {
                from: '202101232@daiict.ac.in', // Sender's email address
                to: email,//'202101234@daiict.ac.in', // Recipient's email address
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

        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.find({ email: Email })

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
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
      console.log(user);
        const newpwd = req.body.newpass;
        console.log(req.body);

        
       
        
        const hashedpwd = await bcrypt.hash(newpwd, saltRounds);
        user.password = hashedpwd;
        await user.save();
        console.log(user);
        console.log("sucessfully changed");

        // const title = "SUCCESS";
        // const message = "Password changed successfully!";
        // const icon = "success";
        // const href = "/adminhome";
        res.render("Admin/adminlogin", {user});

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}


exports.g_forgetpwdmember = async (req, res) => {
    try {
        // const stored_token = req.cookies.jwtoken;
        // const verify_one = jwt.verify(stored_token, "mem123");
        // const email = verify_one.email;
        // const user = await User.find({ email: email })
        res.render("Member/forgetpwdmember");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
exports.p_forgetpwdmember = async (req, res) => {
    try {
       
        const email = req.body.email;
        const user = await User.findOne({ email: email })
        console.log(user);
        if(!user)
             res.send("no match email");
        
        const otp =otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        const secret = "mem123";
        const token = jwt.sign({ otp: otp, email: user.email }, secret);

        console.log("tokenn");
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
       
        console.log("generatedd");
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
           console.log(email);
            const mailOptions = {
                from: '202101232@daiict.ac.in', // Sender's email address
                to: email,//'202101234@daiict.ac.in', // Recipient's email address
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
                res.render("Member/passotpmember", {otp });
            })
        
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
exports.p_varifyotpmember = async (req, res) => {
    try {
        console.log("varifyyyyyyy");
        const enteredOtp = req.body.otp;
        console.log(enteredOtp);

        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.find({ email: Email })

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
        res.render("Member/newpwdmember");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}

exports.p_newpassmember= async (req, res) => {
    try {
        console.log("helololoo");
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
      console.log(user);
        const newpwd = req.body.newpass;
        console.log(req.body);

        
       
        
        const hashedpwd = await bcrypt.hash(newpwd, saltRounds);
        user.password = hashedpwd;
        await user.save();
        console.log(user);
        console.log("sucessfully changed");

        // const title = "SUCCESS";
        // const message = "Password changed successfully!";
        // const icon = "success";
        // const href = "/adminhome";
        res.render("Member/memberlogin", {user});

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while changing password!");
    }
}

exports.g_viewtask = async (req, res) => {      // done
    try { 
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })

        const assignments = await Assignment.find({ assignedBy: user }).populate('assignedTo', 'name email');
        console.log(assignments);
       
        res.render("Admin/viewtask", {user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};

exports.g_assigntask = async (req, res) => {    //done
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
       
        res.render("Admin/assigntask", {user});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};

exports.p_assigntask = async (req, res) => {     //
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        const { taskname, email, description } = req.body;

        // Find the employee by ID
        const employee = await User.findOne({ email: email });
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
       console.log(employee);
        // Create a new assignment
        const assignment = new Assignment({
            title: taskname,
            description: description,
            assignedTo: employee._id,
            assignedBy: user._id, // Assuming req.user contains the admin's user info
           
        });
        console.log(assignment);
        await assignment.save();
        console.log("saveee");
        res.redirect("viewtask");

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};

exports.g_pendingtask = async (req, res) => {     // done
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        
        console.log(user);
        const assignments = await Assignment.find({ assignedBy: user, status: { $in: ['incomplete', 'pending_review'] } }).populate('assignedTo', 'name email');
        console.log(assignments);
        console.log("heyyyyyyy");
        res.render("Admin/pendingtask" ,{user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};


exports.g_completedtask = async (req, res) => {     //done
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        
        console.log(user);
        const assignments = await Assignment.find({ assignedBy: user, status: 'completed' }).populate('assignedTo', 'name email');
        console.log(assignments);
        console.log("heyyyyyyy");
        res.render("Admin/completedtask" ,{user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};


exports.g_viewtask_mem = async (req, res) => {         //done
    try { 
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })

        const assignments = await Assignment.find({ assignedTo: user }).populate('assignedBy', 'name email');
       
        res.render("Member/viewtaskmem", {user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};


exports.g_pendingtask_mem = async (req, res) => {    // done
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        
        console.log(user);
        const assignments = await Assignment.find({ assignedTo: user,  status: { $in: ['incomplete', 'pending_review'] }}).populate('assignedBy', 'name email');
        console.log(assignments);
        console.log("heyyyyyyy");
        res.render("Member/pendingtaskmem" ,{user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};


exports.g_completedtask_mem = async (req, res) => {     // done
    try { 
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        
        console.log(user);
        const assignments = await Assignment.find({ assignedTo: user, status: 'completed' }).populate('assignedBy', 'name email');
        console.log(assignments);
        console.log("heyyyyyyy");
        res.render("Member/completedtaskmem" ,{user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};


exports.g_varifytask = async (req, res) => {
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        
        console.log(user);
        const assignments = await Assignment.find({ assignedBy: user, status: 'pending_review' }).populate('assignedTo', 'name email');
        console.log(assignments);
        console.log("heyyyyyyy");
        res.render("Admin/varifytask" ,{user, assignments});

        // res.status(200).send('Task assigned successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while assigning the task');
    }
};
exports.p_varifytask = async (req, res) => {
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        console.log("hooo");
        console.log(req.body);
       
        if (req.body.done) {
            const assignment = await Assignment.findOne({ _id: req.body.done });
            
        await Assignment.findByIdAndUpdate(assignment._id, { status: 'completed' });
            // const course = await Assignment.findOne({ _id: req.body.done });
            res.redirect("varifytask");
        }
        else {
            const assignment = await Assignment.findOne({ _id: req.body.undone });
        await Assignment.findByIdAndUpdate(assignment._id, { status: 'incomplete' });
            // const course = await Assignment.findOne({ _id: req.body.done });
            res.redirect("varifytask");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while fetching course data");
    }
}

exports.p_pendingtask_mem = async (req, res) => {      //done  second time click
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        console.log("hooo");
        console.log(req.body);
       
        if (req.body.varify) {
            const assignment = await Assignment.findOne({ _id: req.body.varify });
            
        await Assignment.findByIdAndUpdate(assignment._id, { status: 'pending_review' });
            // const course = await Assignment.findOne({ _id: req.body.done });
            res.redirect("pendingtaskmem");
        }
       
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while fetching course data");
    }
}

exports.g_updateadmin = async (req, res) => {
    try {
        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })

        res.render("Admin/updateadmin.ejs", { user });

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while updating faculty data");
    }
}

exports.p_updateadmin = async (req, res) => {
    try {
        

        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "ad123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })

        const update = {
             name: req.body.name,
            email: req.body.email,
            role: req.body.role, 
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
           
        }
        console.log(update);

        await User.updateOne({ _id: user._id }, update);
        console.log("updateddd");

        // const title = "SUCCESS";
        // const message = "Faculty details updated!";
        // const icon = "success";
        // const href = "/viewfaculty";
        res.redirect("admin-profile");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while updating faculty data");
    }
}

exports.g_updatemember = async (req, res) => {
    try {
        console.log("0");
        const stored_token = req.cookies.jwtoken;
       
        const verify_one = jwt.verify(stored_token, "mem123");
        console.log("1");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })
        console.log("2");
        res.render("Member/updatemember.ejs", { user });

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while updating faculty data");
    }
}

exports.p_updatemember = async (req, res) => {
    try {
        

        const stored_token = req.cookies.jwtoken;
        const verify_one = jwt.verify(stored_token, "mem123");
        const Email = verify_one.email;
        const user = await User.findOne({ email: Email })

        const update = {
             name: req.body.name,
            email: req.body.email,
            role: req.body.role, 
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
           
        }
        console.log(update);

        await User.updateOne({ _id: user._id }, update);
        console.log("updateddd");

        // const title = "SUCCESS";
        // const message = "Faculty details updated!";
        // const icon = "success";
        // const href = "/viewfaculty";
        res.redirect("mem-profile");

    } catch (err) {
        console.error(err);
        res.status(500).send("An error occured while updating faculty data");
    }
}

async function isLoggedInadmin(req, res, next) {
    try {

        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyuser = jwt.verify(token, "ad123");
        console.log(verifyuser);

        const admin = await User.findOne({ email: verifyuser.email });
        console.log(admin.email);

        //next();

    } catch (err) {
        res.send(err);
    }
};
exports.logoutadmin = async (req, res, next) => {
    try {
        await isLoggedInadmin(req);
        res.clearCookie("jwtoken");
        console.log("Logout successfully!!");
        // const title = "SUCCESS";
        // const message = "You have logged out successfully!";
        // const icon = "success";
        // const href = "/";
        // res.render("Admin/alert.ejs", { title, message, icon, href });
        res.render("user");

    } catch (err) {
        // This block will only execute if isLoggedInstudent returns false
        res.status(500).send("first you should login and then try to logout");
    }
};

async function isLoggedInmember(req, res, next) {
    try {

        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyuser = jwt.verify(token, "mem123");
        console.log(verifyuser);

        const admin = await User.findOne({ email: verifyuser.email });
        console.log(admin.email);

        //next();

    } catch (err) {
        res.send(err);
    }
};
exports.logoutmember = async (req, res, next) => {
    try {
        await isLoggedInmember(req);
        res.clearCookie("jwtoken");
        console.log("Logout successfully!!");
        // const title = "SUCCESS";
        // const message = "You have logged out successfully!";
        // const icon = "success";
        // const href = "/";
        // res.render("Admin/alert.ejs", { title, message, icon, href });
        res.render("user");

    } catch (err) {
        // This block will only execute if isLoggedInstudent returns false
        res.status(500).send("first you should login and then try to logout");
    }
};
