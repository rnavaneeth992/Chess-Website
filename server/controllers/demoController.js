const prisma = require('../prisma/prisma');
const {bookDemo} = require("../models/demoModel");
const {sendEmail} = require("../services/email");

const book = async (req,res) => {
    const demo = await prisma.demo.findUnique({
        where: {
          email: req.body.email,
        },
    })
    if(demo!=null)
    {
        if(demo.status==0)
        {
            return res.status(201).json({
                message: 'You already asked for demo, we will assign demo soon',
                result: demo,
                err: null
             });
        }
        else
        {
            return res.status(201).json({
                message: 'Your demo is already completed, please register for classes',
                result: demo,
                err: null
             });
        }
       
    }
    let {result,err} = await bookDemo(req.body);
    if(result)
    {
        console.log(req.body);
        const htmlContent=`<html>
        <head>
          <!-- No external stylesheets, only inline styles -->
        </head>
        <body style="font-family: 'Arial', sans-serif; background: linear-gradient(to right, #4CAF50, #2196F3); color: #fff; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: rgba(255, 255, 255, 0.9); box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px; border-radius: 10px;">
                <h2 style="color: #333;">Demo Booking Successful</h2>
                <p style="color: #333;">We will update you soon about the demo</p>
                <p style="color: #333;">Thank You, ${req.body.name}</p>
            </div>
        </body>
      </html>`
        await sendEmail(req.body.email,'Demo booking successful',htmlContent)
        await sendEmail("wrkathm72@gmail.com",'Demo booking successful',htmlContent) // have to change for all admins
        return res.status(201).json({
            message: 'Demo booked successfully. Please check your email',
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

module.exports={
    book
}