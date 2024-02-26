const express = require("express");
const router = express.Router();
const { 
    registerController, 
    loginController, 
    updateUserController, 
    requireSignIn, 
    upload, 
    uploadImage,
    getAllUsersController,  
    getTotalUsersController,
    updateRating,
    updatePasswordController,
    getUserDetailsController

} = require('../controllers/userController');

// Register route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// Upload route
router.post("/upload", upload.single("image"), uploadImage);

// Update user route
router.put("/update-user", upload.single("image"), requireSignIn, updateUserController);

router.get("/all-users", getAllUsersController  );

router.get("/total-users", getTotalUsersController  );

router.post("/ratings", updateRating)

router.put("/update-pass", requireSignIn, updatePasswordController);

router.post("/get-user", requireSignIn, getUserDetailsController );
module.exports = router;
