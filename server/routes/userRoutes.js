const express = require("express");
const router = express.Router();
const { 
    registerController, 
    loginController, 
    updateUserController, 
    requireSignIn, 
    upload, 
    uploadImage,  
    getAllUsers // Import the getAllUsers function
} = require('../controllers/userController');

// Register route
router.post("/register", registerController);

// Login route
router.post("/login", loginController);

// Upload route
router.post("/upload", upload.single("image"), uploadImage);

// Update user route
router.put("/update-user", upload.single("image"), requireSignIn, updateUserController);

// Get all users route
router.get("/allusers/:id", getAllUsers);

module.exports = router;
