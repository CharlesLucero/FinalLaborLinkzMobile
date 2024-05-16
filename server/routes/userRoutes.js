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
    getUserDetailsController,
    verificationController,
    banUserController,
    getAllBannedUsersController,
    getUnverifiedUser,
    verifyUserController,
    countPendingVerificationUsersController,
    getUserByIdNameController,
    getBannedUsersController,
    getVerifiedUsersController
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

router.get("/total-verified", countPendingVerificationUsersController );

router.get("/total-users", getTotalUsersController  );

router.get("/get-banned", getAllBannedUsersController );

router.get("/get-unverified", getUnverifiedUser);

router.post("/ban-user", banUserController );

router.post("/verify-user", verifyUserController );

router.post("/ratings", updateRating)

router.put("/update-pass", requireSignIn, updatePasswordController);

router.post("/get-user", requireSignIn, getUserDetailsController );

router.get("/all", getUserByIdNameController  );

router.get("/ban", getBannedUsersController  );


router.get("/verified", getVerifiedUsersController  );


router.put("/update-veri", upload.array('idImages', 2), requireSignIn, verificationController);
module.exports = router;
