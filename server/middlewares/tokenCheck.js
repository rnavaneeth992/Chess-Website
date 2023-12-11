const {VerifyJWT} = require("../services/jwtauth");

const tokenCheck = async (req,res,next) => {
    let token = req.headers['token'];
    if (!token) {
      return res.status(400).json({
         message: 'Token not found',
         isExpired: true,
         refresh: true,
      });
   }

   if(VerifyJWT(token)===null)
   {
    return res.status(400).json({
        message: 'Invalid Token',
        isExpired: true,
        refresh: true,
     });
   }
   else 
   {

      req.mainId=VerifyJWT(token).id;
   }
   next();
}

module.exports = {
    tokenCheck
}