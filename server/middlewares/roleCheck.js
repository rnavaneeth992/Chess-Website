const {VerifyJWT} = require("../services/jwtauth");

const roleCheck = async (req,res,next) => {
    const parts = req.originalUrl.split('/');
    const cleanParts = parts.filter(part => part !== "");
    const role=cleanParts[1];
    let token = req.headers['token'];
    let value=VerifyJWT(token);
    if(role==value.role)
    {
        next();
    }
    else
    {
        return res.status(400).json({
            message: "Role doesn't match",
         });
    }
}

module.exports = {
    roleCheck,
}