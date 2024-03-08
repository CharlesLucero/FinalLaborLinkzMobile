const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { reportUser, getAllReports } = require("../controllers/reportController");

//router object
const router = express.Router();


 router.post("/report-user", requireSignIn, reportUser )
 router.get("/get-reports", getAllReports )



//export
module.exports = router;