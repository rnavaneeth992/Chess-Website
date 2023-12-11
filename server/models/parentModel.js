const prisma = require('../prisma/prisma');
const {hashPassword,verifyPassword} = require("../services/hashPassword");

const parentAddUser = async (body) => {
    try {
        let hash=hashPassword(body.password);
        const result = await prisma.parent.create({
            data: {
              name: body.name,
              email: body.email,
              password: hash,
              phnum: body.phnum
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        return { result:null, err: err };
    }
}

const loginParent = async (body) => {
    try {
        const result = await prisma.parent.findUnique({
            where: {
              email: body.email
            }
          });
        console.log(result);
        console.log(verifyPassword(body.password,result.password));
        if(!verifyPassword(body.password,result.password))
        {
            return { result:"Password Didn't match", err: null };
        }
        return { result:result, err: null };
    } catch (err) {
        return { result:null, err: err };
    }
}

const addNewStudent = async (body,id) => {
    try {
        const result = await prisma.student.create({
            data: {
              name: body.name,
              parentId: id
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        return { result:null, err: err };
    }
}

const getAllStudents = async (id) => {
    try {
        const result = await prisma.student.findMany({
            where: {
              parentId: id,
            },
            include: {
              parent: true
            },
          });
        return { result:result, err: null };
    } catch (err) {
        return { result:null, err: err };
    }
}

const applyForCourse = async (body) => {
  try {
    /*
    Levels:
    1 - Beg
    2 - Medium
    3 - Adv1
    4 - Adv2
    */
    const result = await prisma.courses.create({
      data: {
        studentId: body.studentId,
        level: body.level,
        currentSession: 0
      },
    });
    return { result: result, err: null };
  } catch (err) {
    console.log(err);
    return { result: null, err: err };
  }
}

const courseDetailsForStudent = async (id) => {
  try {
    const result = await prisma.courses.findMany({
      where: {
        studentId:id
      }
    });
    return { result: result, err: null };
  } catch (err) {
    console.log(err);
    return { result: null, err: err };
  }
}

const feedbackCourse = async (id,body) => {
  try {
      const result = await prisma.class.update({
          where: {
            id: Number(id),
          },
          data: {
            parentFeedback: body.feedback,
          },
        })
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

const getStudentProfile = async (id) => {
  try {
    const result = await prisma.student.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          parent: true
        },
      })
    return { result:result, err: null };
} catch (err) {
    console.log(err);
    return { result:null, err: err };
}
}

const getHistory = async (id) => {
  try {
      const result = await prisma.courses.findUnique({
          where: {
            id: Number(id),
          },
          include: {
            student : true,
            instructor: true,
            classes:true
          },
        })
      return { result:result, err: null };
  } catch (err) {
      console.log(err);
      return { result:null, err: err };
  }
}

module.exports = {
    parentAddUser,
    loginParent,
    addNewStudent,
    getAllStudents,
    applyForCourse,
    courseDetailsForStudent,
    feedbackCourse, 
    getProfile,
    getStudentProfile,
    getHistory
}