const {instructorAddUser,loginInstructor,findInstructor,createClassCourse, feedbackCourse, changeCurrentSession, getProfile, editClassCourse} = require("../models/instructorModel");

const login = async (req,res,next) => {
    const user = await findInstructor(req.body.email);
    if(user==null)
    {
        return res.status(400).json({
            message: 'User Not Exist',
            result: user,
            err: null
         });
    }
    let {result,err} = await loginInstructor(req.body);
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

const addInstructor = async (req,res,next) => {
    const user = await findInstructor(req.body.email);
    if(user!=null)
    {
        return res.status(400).json({
            message: 'Email Already Exist',
            result: user,
            err: null
         });
    }
    let {result,err} = await instructorAddUser(req.body);
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

const createClass = async (req,res) => {
    let {result,err} = await createClassCourse(req.body);
    if(!err)
    {
        return res.status(201).json({
            message: 'Class Created',
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

const giveFeedback = async (req,res) => {
    let {result,err} = await feedbackCourse(req.params.id,req.body);
    if(!err)
    {
        return res.status(201).json({
            message: 'Feedback Added',
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

const changeSession = async (req,res) => {
    let {result,err} = await changeCurrentSession(req.params.id);
    if(!err)
    {
        return res.status(201).json({
            message: 'Session Updated',
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
    // to avoid bigint serialization error
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    console.log(req.mainId);
    let {result,err} = await getProfile(req.mainId);
    if(result)
    {
        return res.status(201).json({
            message: 'Instructor Profile Sent',
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

const editClass = async (req,res) => {
    let {result,err} = await editClassCourse(req.params.id,req.body);
    if(!err)
    {
        return res.status(201).json({
            message: 'Class Editted',
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
    addInstructor,
    createClass,
    giveFeedback,
    changeSession,
    profile,
    editClass
}