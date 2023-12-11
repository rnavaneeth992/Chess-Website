const router = require('express').Router();
const {book} = require("../controllers/demoController");

router.post("/book",book);

module.exports = router;