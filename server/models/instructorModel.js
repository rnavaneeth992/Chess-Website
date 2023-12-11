const prisma = require('../prisma/prisma');
const {hashPassword,verifyPassword} = require("../services/hashPassword");

const instructorAddUser = async (body) => {
    try {
        let hash=hashPassword(body.password);
        const result = await prisma.instructor.create({
            data: {
              name: body.name,
              email: body.email,
              password: hash,
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        return { result:null, err: err };
    }
}

const loginInstructor = async (body) => {
    try {
        const result = await prisma.instructor.findUnique({
            where: {
              email: body.email
            }
          });
        console.log(result);
        console.log(verifyPassword(body.password,result.password));
        if(verifyPassword(body.password,result.password)==false)
        {
            return { result:"Password Didn't match", err: null };
        }
        return { result:result, err: null };
    } catch (err) {
        return { result:null, err: err };
    }
}

const findInstructor = async (email) => {
    const user = await prisma.instructor.findUnique({
        where: {
          email: email,
        },
    })
    return user;
}

const createClassCourse = async (data) => {
    try {
        const courseDetail = await prisma.courses.findUnique({
          where:{
            id:data.courseId
          }
        }) 
        console.log(data);
        const result = await prisma.class.create({
            data: {
              courseId: data.courseId,
              classDate: new Date(data.classDate).toISOString(),
              classDuration: data.classDuration,
              session: courseDetail.currentSession+1
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.error("Error in createClassCourse:", err);
        return { result:null, err: err };
    }
}

const feedbackCourse = async (id,body) => {
    try {
        const result = await prisma.class.update({
            where: {
              id: Number(id),
            },
            data: {
              instructorFeedback: body.feedback,
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const changeCurrentSession = async (id) => {
    try {
        const result = await prisma.courses.update({
            where: {
              id: Number(id),
            },
            data: {
                currentSession: {
                  increment: 1,
                },
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const getProfile = async (id) => {
  try {
      const result = await prisma.parent.findUnique({
          where: {
            id: id,
          },
        })
      return { result:result, err: null };
  } catch (err) {
      console.log(err);
      return { result:null, err: err };
  }
}

const editClassCourse = async (id,data) => {
  try {
      const result = await prisma.class.update({
          where: {
            id: Number(id),
          },
          data: {
            classDate: new Date(data.classDate).toISOString(),
            classDuration: data.classDuration,
          },
        })
      console.log(result);
      return { result:result, err: null };
  } catch (err) {
      console.log(err);
      return { result:null, err: err };
  }
}

module.exports = {
    instructorAddUser,
    loginInstructor,
    findInstructor,
    createClassCourse,
    feedbackCourse,
    changeCurrentSession,
    getProfile,
    editClassCourse
}