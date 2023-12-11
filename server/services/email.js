const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
     },
});

const sendEmail = async (toEmail,subject,text) => {
    try{
        console.log(toEmail,subject,text);
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: toEmail,
            subject: subject,
            html: text
          });
          console.log("Message sent: %s", info.response);        
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports={
    sendEmail
}