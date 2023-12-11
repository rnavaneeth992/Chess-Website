const router = require('express').Router();

const {login,addParent,addStudent,getStudents,applyCourse,giveFeedback, profile, profileStudent, classHistory, moduleHistory, calenderSchedule} = require("../controllers/parentController");
const {loginMiddleware} = require("../middlewares/loginMiddleware");
const {tokenCheck} = require("../middlewares/tokenCheck");
const {roleCheck} = require("../middlewares/roleCheck");

router.post("/login",login,loginMiddleware);
router.post("/signup",addParent,loginMiddleware);
router.post("/addStudent",tokenCheck,roleCheck,addStudent);
router.get("/getStudents",tokenCheck,roleCheck,getStudents);
router.post("/applyCourses",tokenCheck,roleCheck,applyCourse);
router.put("/feedbackClass/:id",tokenCheck,roleCheck,giveFeedback);
router.get("/classHistory/:id",tokenCheck,roleCheck,classHistory);
router.get("/moduleHistory/:id",tokenCheck,roleCheck,moduleHistory);
router.get("/profile",tokenCheck,roleCheck,profile);
router.get("/getStudentProfile/:id",tokenCheck,roleCheck,profileStudent);
router.get("/calenderSchedule/:id",tokenCheck,roleCheck,calenderSchedule);

module.exports = router;