const {CreateJWT} = require("../services/jwtauth");

const loginMiddleware = (req,res) => {
    console.log(req.originalUrl);
    const parts = req.originalUrl.split('/');
    const cleanParts = parts.filter(part => part !== "");
    const role=cleanParts[1];
    let token=CreateJWT(req.result.id,role);
    res.set({
        'Content-Type': 'application/json',
        token: token,
    });
    return res.status(200).json({
        message: 'Successful',
        result: req.result,
        token: token,
        err: req.err
     });
}

module.exports ={
    loginMiddleware
}