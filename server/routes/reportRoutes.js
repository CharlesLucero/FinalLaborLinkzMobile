const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { reportUser } = require("../controllers/reportController");

//router object
const router = express.Router();


 router.post("/report-user", requireSignIn, reportUser )



//export
module.exports = router;