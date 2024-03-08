const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");
const multer = require('multer');


//middleware
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./filesUpload/"); // Specify the desired destination folder
      
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });


//register controller

const registerController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      gender,
      email,
      password,
      regionName,
      regionCode,
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      barangayName,
      barangayCode,
    } = req.body;
    // Validation
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !gender ||
      !email ||
      !password ||
      !regionName ||
      !regionCode ||
      !provinceName ||
      !provinceCode ||
      !cityName ||
      !cityCode ||
      !barangayName ||
      !barangayCode
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }


    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }


    // Hash the password
    const hashedPassword = await hashPassword(password);


    // Create the user with the rating field included
    const user = await userModel({
      firstName,
      lastName,
      contactNumber,
      gender,
      email,
      password: hashedPassword,
      rating: 0,
      region: { code: regionCode, name: regionName },
      province: { code: provinceCode, name: provinceName },
      city: { code: cityCode, name: cityName },
      barangay: { code: barangayCode, name: barangayName },
    }).save();


    return res.status(201).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};






//login controller
const loginController = async (req, res) => {
    try{
        const { email, password } = req.body;
        //validation
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please provide email or password'
            });
        }


        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        //match password
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(500).send({
                success: false,
                message:'Please provide a correct password'
            });
        }
        //token jwt
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "50d",
          });

          // Omit sensitive information from the user object
          user.password = undefined;

        res.status(200).send({
            success: true,
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error in login api'
       
        });
    }
};



const updateUserController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      gender,
      location,
      email,
      password,
      regionName,
      regionCode,
      provinceName,
      provinceCode,
      cityName,
      cityCode,
      barangayName,
      barangayCode,
    } = req.body;


    // Get the user from the database
    const user = await userModel.findOne({ email });


    // Handle image update if included in the request
    let updatedImage = user.image; // Default to the existing image
    if (req.file) {
      // If a new image is uploaded, update the image path
      updatedImage = req.file.filename;
      // updatedImage = req.file.path;
      // Assuming the image is stored in req.file.path after upload
    }


    // Password validation and hashing
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message:
          "Password is required and should be at least 6 characters long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;


    // Update user information including the updated image path if provided
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        contactNumber: contactNumber || user.contactNumber,
        location: location || user.location,
        gender: gender || user.gender,
        password: hashedPassword || user.password,
        image: updatedImage, // Update the image path
        region: {
          code: regionCode || user.region.code,
          name: regionName || user.region.name,
        },
        province: {
          code: provinceCode || user.province.code,
          name: provinceName || user.province.name,
        },
        city: {
          code: cityCode || user.city.code,
          name: cityName || user.city.name,
        },
        barangay: {
          code: barangayCode || user.barangay.code,
          name: barangayName || user.barangay.name,
        },
      },
      { new: true }
    );


    updatedUser.password = undefined; // Remove password from the response
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in user update",
      error: error.message,
    });
  }
};


  const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: "Failed to fetch all users." });
    }
  };


  // Get total number of users controller
const getTotalUsersController = async (req, res) => {
  try {
    // Query the database to get the count of all users
    const totalUsersCount = await userModel.countDocuments();
    res.status(200).json({
      success: true,
      totalUsers: totalUsersCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error getting total number of users",
      error: error.message,
    });
  }
};

const updateRating = async (req, res) => {
  try {
      const { userId, rating } = req.body;
      
      // Update the user's rating in the database
      await userModel.findByIdAndUpdate(userId, { rating });
      
      res.status(200).send({
          success: true,
          message: 'Rating updated successfully',
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          success: false,
          message: 'Error updating rating',
          error: error.message,
      });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;


    // Find the user by email
    const user = await userModel.findOne({ email });


    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided email.",
      });
    }


    // Compare the old password with the hashed password stored in the database
    const isMatch = await comparePassword(oldPassword, user.password);


    // If old password does not match, return an error
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password.",
      });
    }


    if (newPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }


    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);


    // Update the password in the database
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );


    // Remove password from the response
    updatedUser.password = undefined;


    // Send success response
    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in updating password.",
      error: error.message,
    });
  }
};

const getUserDetailsController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }


    // Find the user by ID
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Omit sensitive information from the user object
    user.password = undefined;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user details",
      error: error.message,
    });
  }
};

const uploadImage = async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;

  try {
    await Images.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};

const verificationController = async (req, res) => {
  try {
    const { email, idType } = req.body;


    if (!idType) {
      return res.status(400).json({
        success: false,
        message: "Please provide ID type.",
      });
    }


    // Check if frontImage and backImage are uploaded
    if (!req.files || req.files.length !== 2) {
      if (!req.files) {
        return res.status(400).json({
          success: false,
          message: "Please upload both front and back images of the ID.",
        });
      } else if (req.files.length === 1) {
        return res.status(400).json({
          success: false,
          message: "Please upload both front and back images of the ID.",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Please upload both front and back images of the ID.",
        });
      }
    }




    // Get the user from the database
    const user = await userModel.findOne({ email });


    // Handle image updates for front and back IDs
    let frontImage = ""; // Initialize front image
    let backImage = ""; // Initialize back image


    // Check if both front and back images are uploaded
    if (req.files.length === 2) {
      // Assuming req.files[0] is for the front image and req.files[1] is for the back image
      frontImage = req.files[0].filename;
      backImage = req.files[1].filename;
    } else {
      // Handle the case where both images are not uploaded
      return res.status(400).json({
        success: false,
        message: "Please upload both front and back images of the ID.",
      });
    }


    // Update user information including the updated image paths and ID type
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        "identification.idType": idType,
        "identification.front": frontImage, // Update the front image path
        "identification.back": backImage, // Update the back image path
      },
      { new: true }
    );


    // Remove password from the response
    updatedUser.password = undefined;


    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in user update",
      error: error.message,
    });
  }
};

const banUserController = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log(`THIS IS THE USER IDDD:D:D:D: ${userId}`);
    // Find the user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the user is already banned
    if (user.banned) {
      return res.status(409).json({
        success: false,
        message: "User is already banned",
      });
    }

    // Update the user's banned status to true
    user.banned = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User banned successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error banning user",
      error: error.message,
    });
  }
};

const getAllBannedUsersController = async (req, res) => {
  try {
    // Query the database to count all banned users
    const bannedUsersCount = await userModel.countDocuments({ banned: true });
    res.status(200).json({
      success: true,
      bannedUsersCount: bannedUsersCount
    });
  } catch (error) {
    console.error("Error fetching all banned users:", error);
    res.status(500).json({ error: "Failed to fetch all banned users." });
  }
};


const getUnverifiedUser = async (req, res) => {
  try {
    // Query the database to get all users that are not yet verified
    const unverifiedUsers = await userModel.find({ verified: false });
    res.status(200).json(unverifiedUsers);
  } catch (error) {
    console.error("Error fetching all unverified users:", error);
    res.status(500).json({ error: "Failed to fetch all unverified users." });
  }
};

const verifyUserController = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required for user verification.",
      });
    }

    // Find the user by userId
    const user = await userModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the provided ID.",
      });
    }

    // Check if the user is already verified
    if (user.verified) {
      return res.status(409).json({
        success: false,
        message: "User is already verified.",
      });
    }

    // Update the user's verification status to true
    user.verified = true;
    await user.save();

    // Omit sensitive information from the user object
    user.password = undefined;

    // Send success response with updated user details
    res.status(200).json({
      success: true,
      message: "User verification successful.",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error verifying user.",
      error: error.message,
    });
  }

};
const countPendingVerificationUsersController = async (req, res) => {
  try {
    // Query the database to get the count of all unverified users
    const pendingVerificationCount = await userModel.countDocuments({ verified: false });

    // Query the database to get the count of all users
    const totalUsersCount = await userModel.countDocuments();

    res.status(200).json({
      success: true,
      totalUsers: totalUsersCount,
      pendingVerificationUsers: pendingVerificationCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error counting pending verification users",
      error: error.message,
    });
  }
};


module.exports = { 
    requireSignIn, 
    registerController, 
    loginController, 
    updateUserController,
    upload,
    verificationController,
    updatePasswordController,
    uploadImage ,
    getAllUsersController,
    getTotalUsersController,
    updateRating,
    getUserDetailsController,
    banUserController,
    getAllBannedUsersController,
    getUnverifiedUser,
    verifyUserController,
    countPendingVerificationUsersController
};
