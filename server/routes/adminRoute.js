const router = require('express').Router();

const {login,addAdmin,demoAdd,getDemos,courseAdd,getParents,getInstructor,
    getInstructorIds,
    completeDemo,
    profile} = require("../controllers/adminController");
const {loginMiddleware} = require("../middlewares/loginMiddleware");
const {tokenCheck} = require("../middlewares/tokenCheck");
const {roleCheck} = require("../middlewares/roleCheck");

router.post("/login",login,loginMiddleware);
router.post("/addAdmin",tokenCheck,roleCheck,addAdmin);
router.put("/instructorDemo/:id",tokenCheck,roleCheck,demoAdd);
router.put("/completedDemo/:id",tokenCheck,roleCheck,completeDemo);
router.get("/demos",tokenCheck,roleCheck,getDemos);
router.put("/instructorCourse/:id",tokenCheck,roleCheck,courseAdd);
router.get("/getParentSignup", tokenCheck,roleCheck,getParents);
router.get("/getInstructorSignup", tokenCheck,roleCheck,getInstructor);
router.get("/getInstructorIds", tokenCheck,roleCheck,getInstructorIds);
router.get("/profile",tokenCheck,roleCheck,profile);

module.exports = router;