const prisma = require('../prisma/prisma');

const bookDemo = async (body) => {
    try {
        console.log(body);
        const result = await prisma.demo.create({
            data: {
              name: body.name,
              email: body.email,
              level: body.level,     
              inspiration: body.inspiration,
              experience: body.experience,
              experienceYear: body.experienceYear,
              interest: body.interest,
              demoTime: body.demoTime,
              contactTime: body.contactTime,
              contact: body.contact,
              status:0
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
    bookDemo
}