const prisma = require('../prisma/prisma');
const {adminAddUser,loginAdmin,addDemoInstructor,getAllDemos,
addCourseInstructor,getAllParents,getAllInstructors,getAllInstructorIds, changeDemoStatus, getProfile} = require("../models/adminModel");

const login = async (req,res,next) => {
    const user = await prisma.admin.findUnique({
        where: {
          email: req.body.email,
        },
    })
    if(user==null)
    {
        return res.status(400).json({
            message: 'User Not Exist',
            result: user,
            err: null
         });
    }
    let {result,err} = await loginAdmin(req.body); 
    if(result==="Password Didn't match")
    {
        return res.status(400).json({
            message: 'Password Wrong',
            result: req.body,
            err: null
         });
    }
    if(!err)
    {
        req.result=result;
        req.err=err;
        next();
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const addAdmin = async (req,res) => {
    const user = await prisma.admin.findUnique({
        where: {
          email: req.body.email,
        },
    })
    if(user!=null)
    {
        return res.status(400).json({
            message: 'Email Already Exist',
            result: user,
            err: null
         });
    }
    let {result,err} = await adminAddUser(req.body);
    if(!err)
    {
        return res.status(200).json({
            message: 'Successful',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const demoAdd = async (req,res) => {
    let {result,err} = await addDemoInstructor(req.body, req.params.id);
    if(result)
    {
        return res.status(201).json({
            message: 'Instructor Mapped',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const getDemos = async (req,res) => {
    let {result,err} = await getAllDemos();
    if(result)
    {
        return res.status(201).json({
            message: 'All Demos',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const courseAdd = async (req,res) => {
    let {result,err} = await addCourseInstructor(req.body, req.params.id);
    if(result)
    {
        return res.status(201).json({
            message: 'Instructor Mapped to Course',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const getParents = async (req,res) => {
    let {result,err} = await getAllParents();
    if(result)
    {
        return res.status(201).json({
            message: 'All Signup Parent Details',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const getInstructor = async (req,res) => {
    let {result,err} = await getAllInstructors();
    if(result)
    {
        return res.status(201).json({
            message: 'All Signup Instructor Details',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const getInstructorIds = async (req,res) => {
    let {result,err} = await getAllInstructorIds();
    if(result)
    {
        return res.status(201).json({
            message: 'All Signup Instructor Details',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const completeDemo = async (req,res) => {
    let {result,err} = await changeDemoStatus(req.params.id);
    if(result)
    {
        return res.status(201).json({
            message: 'Demo Completed',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

const profile = async (req,res) => {
    console.log(req.mainId);
    let {result,err} = await getProfile(req.mainId);
    if(result)
    {
        return res.status(201).json({
            message: 'Profile Sent',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Successful',
            result: result,
            err: err
         });
    }
}

module.exports ={
    login,
    addAdmin,
    demoAdd,
    getDemos,
    courseAdd,
    getParents,
    getInstructor,
    getInstructorIds,
    completeDemo,
    profile
}