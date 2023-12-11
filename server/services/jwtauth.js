const jwt = require('jsonwebtoken');

const CreateJWT = (id,role) => {
   let token = jwt.sign({ id: id, role: role }, process.env.jwtSecretKey, {
      expiresIn: 5 * 86400,
      algorithm: "HS256",
   });

   return token;
};

const VerifyJWT = (token) => {
   let decoded;
   try {
      decoded = jwt.verify(token, process.env.jwtSecretKey);
   } catch (err) {
      return null;
   }
   return decoded;
};

module.exports = {
   CreateJWT,
   VerifyJWT,
};
