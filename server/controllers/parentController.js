const prisma = require('../prisma/prisma');
const {parentAddUser,loginParent,addNewStudent,getAllStudents,applyForCourse
,courseDetailsForStudent,feedbackCourse, getProfile, getStudentProfile, getHistory} = require("../models/parentModel");
const { syllabus } = require('../data/syllabus');

const login = async (req,res,next) => {
    // to avoid bigint serialization error
    BigInt.prototype.toJSON = function () {
    return this.toString();
    };
    const user = await prisma.parent.findUnique({
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
    let {result,err} = await loginParent(req.body);
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

const addParent = async (req,res,next) => {
    // to avoid bigint serialization error
   BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    const user = await prisma.parent.findUnique({
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
    let {result,err} = await parentAddUser(req.body);
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

const addStudent = async (req,res) => {
    // to avoid bigint serialization error
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    let {result,err} = await addNewStudent(req.body,req.mainId);
    if(!err)
    {
        return res.status(200).json({
            message: 'Added Successfully',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Not Added Successfully',
            result: result,
            err: err
         });
    }
}

const getStudents = async (req,res)=> {
    // to avoid bigint serialization error
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    let {result,err} = await getAllStudents(req.mainId);
    if(!err)
    {
        return res.status(200).json({
            message: 'List of Students',
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Unable to get',
            result: result,
            err: err
         });
    }
}

const applyCourse = async (req,res) => {
    let { result: courseDetailsResult, err: courseDetailsErr } = await courseDetailsForStudent(req.body.studentId);
    if(!courseDetailsErr)
    {
        for(const element of courseDetailsResult)
        {
            if(element.level==req.body.level && element.current<30)
            {
                return res.status(200).json({
                    message: 'You already enrolled for this course',
                    result: courseDetailsResult,
                    err: courseDetailsErr
                 });
            }
        }
    }
    else
    {
        return res.status(400).json({
            message: 'Server error',
            result: result,
            err: err
         });
    }
    const level=syllabus[req.body.level-1];
    let {result,err} = await applyForCourse(req.body);
    if(!err)
    {
        return res.status(200).json({
            message: 'Course Regsitred Successfully, We will assign Instrutor soon',
            level: level,
            result: result,
            err: err
         });
    }
    else
    {
        return res.status(400).json({
            message: 'Unable to do, please try again',
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

const profileStudent = async (req,res) => {
    // to avoid bigint serialization error
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    let {result,err} = await getStudentProfile(req.params.id);
    if(result)
    {
        return res.status(201).json({
            message: 'Student Profile Sent',
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

const classHistory = async (req,res) => {
    let {result,err} = await getHistory(req.params.id);
    let syllabusCourse = syllabus[result.level-1];
    console.log(result);
    let finalResult = [];
    syllabusCourse.syllabus.forEach((topic, topicIndex) => {
        let moduleSessions = Object.keys(topic.sessions).map((sessionId) => {
          const sessionNumber = parseInt(sessionId);
          let status;
      
          if (sessionNumber <= result.currentSession) {
            status = 'Completed';
          } else if (sessionNumber === result.currentSession+1) {
            status = 'In progress';
          } else {
            status = 'Locked';
          }
      
          return {
            sessionId: sessionNumber,
            title: topic.sessions[sessionId],
            status: status,
            resources: topic.resources,
            classDetails: [],
          };
        });
      
        finalResult.push(moduleSessions);
      });
    finalResult.forEach((sessionArray) => {
        sessionArray.forEach((session) => {
          // Find matching classes in result.classes
          const matchingClasses = result.classes.filter((classItem) => classItem.session === session.sessionId);
      
          // If matches are found, update classDetails
          if (matchingClasses.length > 0) {
            session.classDetails = matchingClasses;
          }
        });
      });
    if(result)
    {
        return res.status(201).json({
            message: 'Class History Sent',
            result: finalResult,
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

const moduleHistory = async (req,res) => {
    let {result,err} = await getHistory(req.params.id);
    let syllabusCourse = syllabus[result.level-1];
    let finalResult=[];
    let flag=-1;
    syllabusCourse.syllabus.forEach((session, index) => {
        const isCurrentSession = parseInt(result.currentSession) + 1 in session.sessions;
        
        finalResult.push({
            moduleId: index + 1,
            moduleName: session.mainTopic,
            status: isCurrentSession ? "Progress" : flag===1 ? "Locked" : "Completed"
        });
        flag = isCurrentSession ? 1 : flag;
    });
    if(result)
    {
        return res.status(201).json({
            message: 'Module History Sent',
            result: finalResult,
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

const calenderSchedule = async (req,res) => {
    let {result,err} = await getHistory(req.params.id);
    let syllabusCourse = syllabus[result.level-1];
    let finalResult=[];
    for(let i=0;i<result.classes.length;i++)
    {
        for(let j=0;j<syllabusCourse.syllabus.length;i++)
        {
            if(result.classes[i].session in syllabusCourse.syllabus[j].sessions)
            {
                const classDate = new Date(result.classes[i].classDate);
                const classDuration = result.classes[i].classDuration;
                const endTime = new Date(classDate.getTime() + classDuration * 60000);
                finalResult.push(
                    {
                        id: i+1,
                        title: syllabusCourse.syllabus[j].sessions[result.classes[i].session],
                        desc: syllabusCourse.syllabus[j].mainTopic,
                        start:classDate,
                        end:endTime

                    }
                )
                break;
            }
        }
    }
    if(result)
    {
        return res.status(201).json({
            message: 'Module History Sent',
            result: finalResult,
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
    addParent,
    addStudent,
    getStudents,
    applyCourse,
    giveFeedback, 
    profile,
    profileStudent,
    classHistory,
    moduleHistory,
    calenderSchedule
}