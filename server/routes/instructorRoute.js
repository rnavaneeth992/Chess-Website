const router = require('express').Router();

const {login,addInstructor,createClass,giveFeedback, changeSession,profile, editClass} = require("../controllers/instructorController");
const {loginMiddleware} = require("../middlewares/loginMiddleware");
const {tokenCheck} = require("../middlewares/tokenCheck");
const {roleCheck} = require("../middlewares/roleCheck");

router.post("/login",login,loginMiddleware);
router.post("/signup",addInstructor,loginMiddleware);
router.post("/createClass",tokenCheck,roleCheck,createClass);
router.put("/editClass/:id",tokenCheck,roleCheck,editClass);
router.put("/feedbackClass/:id",tokenCheck,roleCheck,giveFeedback);
router.put("/changeCurrentSession/:id", tokenCheck, roleCheck, changeSession);
router.get("/profile",tokenCheck,roleCheck,profile);

module.exports = router;