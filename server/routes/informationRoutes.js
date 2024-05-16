const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createInformationController,
  getCarpenterController,
  getTechnicianController,
  getDriverController,
  getPlumberController,
  getMaidController,
  getElectricianController,
  getUserInfoController,
  getAllInfoController,
  updateInformationController,

} = require("../controllers/informationController");

//router object
const router = express.Router();

//create information
router.post("/create-info", requireSignIn, createInformationController);

//get info carpendter
router.get("/getinfocarpenter", getCarpenterController);

//get info technician
router.get("/getinfotechnician", getTechnicianController);

//get info driver
router.get("/getinfodriver", getDriverController);

//get info plumber
router.get("/getinfoplumber", getPlumberController);

//get info maid
router.get("/getinfomaid", getMaidController);

//get info electrician
router.get("/getinfoelectrician", getElectricianController);

//get user info
router.get("/get-user-info", requireSignIn, getUserInfoController);

//GET ALL POSTs
router.get("/get-all-info", getAllInfoController);

router.put("/update-info/:id", requireSignIn, updateInformationController);

//export
module.exports = router;