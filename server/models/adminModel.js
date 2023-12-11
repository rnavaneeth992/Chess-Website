const prisma = require('../prisma/prisma');
const {hashPassword,verifyPassword} = require("../services/hashPassword");

const adminAddUser = async (body) => {
    try {
        let hash=hashPassword(body.password);
        const result = await prisma.admin.create({
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

const loginAdmin = async (body) => {
    try {
        const result = await prisma.admin.findUnique({
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
const addDemoInstructor = async (body,id) => {
    try {
        const result = await prisma.demo.update({
            where: {
              id: Number(id),
            },
            data: {
              instructorId: body.instructorId,
              status: 1
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const changeDemoStatus = async (id) => {
    try {
        const result = await prisma.demo.update({
            where: {
              id: Number(id),
            },
            data: {
              status: 2
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const getAllDemos = async () => {
    try {
        const result = await prisma.demo.findMany({
            include: {
                instructor: true
            }
        });
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const addCourseInstructor = async (body,id) => {
    try {
        const result = await prisma.courses.update({
            where: {
              id: Number(id),
            },
            data: {
              instructorId: body.instructorId,
            },
          })
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const getAllParents = async () => {
    try {
        const result = await prisma.parent.findMany({
            include: {
                students: true
            }
        });
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const getAllInstructors = async () => {
    try {
        const result = await prisma.instructor.findMany({
            include: {
                demo: true,
                courses: true
            }
        });
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const getAllInstructorIds = async () => {
    try {
        const result = await prisma.instructor.findMany({
            select: {
              id: true,
              name: true,
            },
          });          
        console.log(result);
        return { result:result, err: null };
    } catch (err) {
        console.log(err);
        return { result:null, err: err };
    }
}

const getProfile = async (id) => {
    try {
        const result = await prisma.admin.findUnique({
            where: {
              id: id,
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
    adminAddUser,
    loginAdmin,
    addDemoInstructor,
    getAllDemos,
    addCourseInstructor,
    getAllParents,
    getAllInstructors,
    getAllInstructorIds,
    changeDemoStatus,
    getProfile
}