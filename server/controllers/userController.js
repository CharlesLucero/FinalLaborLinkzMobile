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
    // Validation
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      !gender ||
      !location ||
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
      location,
      email,
      password: hashedPassword,
      rating: 0, // Add the rating field with a default value of 0
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

        //find user
        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(500).send({
                success: false,
                message: 'User not found please provide a correct Username or register first'
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
            expiresIn: "7d",
          });

        //undefined password
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

  const getAllUsersController = async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: "Failed to fetch all users." });
    }
  };


//hello

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

module.exports = { 
    requireSignIn, 
    registerController, 
    loginController, 
    updateUserController,
    upload,
    uploadImage ,
    getAllUsersController,
    getTotalUsersController,
    updateRating
    };