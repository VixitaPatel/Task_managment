var { User, Task, Assignemt } = require('../Model/model');


const path = require("path");
const bcrypt = require("bcryptjs");

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const saltRounds = 10;


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
        console.log("trueeee0");
        console.log(newuser);
        await newuser.save();
        console.log("sucess");
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

exports.p_admin_login = async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            // const result = await req.body.f_password === user.Password;

            if (result) {
                // const secret = "sagar";
                // const token = await jwt.sign({ "name": user.name, "email_id": user.Email_id }, secret);
                // console.log("YYY");
                // console.log(token);
                // console.log("TTT");
                // res.cookie("f_jwtoken", token, {
                //     expires: new Date(Date.now() + 25892000000),
                //     httpOnly: true
                // });

                // console.log("HHH");

                // const stored_token = req.cookies.f_jwtoken;

                // console.log(stored_token);
                // console.log("KK");
                // const verify_one = jwt.verify(token, secret);
                // console.log(verify_one);
                res.render("Admin/admin_sidenav");
            } else {
                console.log("not match");
                // const title = "ERROR";
                // const message = "Password does not match!";
                // const icon = "error";
                // const href = "/facultylogin";
                res.redirect("/admin-login");
            }
        } else {
            console.log("not exist");
            // const title = "ERROR";
            // const message = "Password does not match!";
            // const icon = "error";
            // const href = "/facultylogin";
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
                // const secret = "sagar";
                // const token = await jwt.sign({ "name": user.name, "email_id": user.Email_id }, secret);
                // console.log("YYY");
                // console.log(token);
                // console.log("TTT");
                // res.cookie("f_jwtoken", token, {
                //     expires: new Date(Date.now() + 25892000000),
                //     httpOnly: true
                // });

                // console.log("HHH");

                // const stored_token = req.cookies.f_jwtoken;

                // console.log(stored_token);
                // console.log("KK");
                // const verify_one = jwt.verify(token, secret);
                // console.log(verify_one);
                // console.log(user);
                res.render("Member/member_sidenav");
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

exports.g_mem_profile = async (req, res) => {
    try {

        const userId = req.query.userId;
        console.log(userId);
        // const userId = req.session.userId;

        // Fetch user information from the database
        const user = await User.findById(userId);
        // const ID = req.body.stud_id;     //Student as a schema name?.populate('ProgramRegistered')
        // const student = await Student.findOne(_id = req.user);
        // const Student_token = req.cookies.jwtokenstudent;
        // const verified_student = jwt.verify(Student_token, "sagar1");
        // const email = verified_student.email_id;
        // const student = await Student.find({ Email_id: email });
        // const program = await Program.findById(student[0].ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');

        // const program = await Program.findById(student.ProgramRegistered).populate('DegreeOffered BranchOffered CourseOffered');
         console.log(user);
        res.render("Member/mem_profile.ejs", { user });

        
       

    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

