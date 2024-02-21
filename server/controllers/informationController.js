const informationModel = require("../models/informationModel");

//create information 
const createInformationController = async (req, res) => {
    try {
      const { bio, age, job, address} = req.body;
      //validate
      if (!bio || !age || !job || !address) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }
      const info = await informationModel({
        bio,
        age,
        job,
        address,
        createdBy: req.auth._id,
        }).save();

   
  
      res.status(201).send({
        success: true,
        message: "Information Created Successfully",
        info,
      });
      console.log(req);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Create Info APi",
        error,
      });
    }
  };

  //get carpenter info
  const getCarpenterController = async (req, res) => {
    try {
        const info = await informationModel.find({ job: { $regex: /Carpenter/i } })
            .populate("createdBy", "_id firstName lastName image")
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "Carpenter Data",
            info,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Carpenter API",
            error,
        });
    }
};

//get technician info
const getTechnicianController = async (req, res) => {
  try {
      const info = await informationModel.find({ job: { $regex: /Technician/i } })
          .populate("createdBy", "_id firstName lastName image")
          .sort({ createdAt: -1 });

      res.status(200).send({
          success: true,
          message: "Technician Data",
          info,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error in Get Technician API",
          error,
      });
  }
};


//get driver info
const getDriverController = async (req, res) => {
  try {
      const info = await informationModel.find({ job: { $regex: /Driver/i } })
          .populate("createdBy", "_id firstName lastName image")
          .sort({ createdAt: -1 });

      res.status(200).send({
          success: true,
          message: "Technician Data",
          info,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error in Get Technician API",
          error,
      });
  }
};


//get electrician info
const getElectricianController = async (req, res) => {
  try {
      const info = await informationModel.find({ job: { $regex: /Electrician/i } })
          .populate("createdBy", "_id firstName lastName image")
          .sort({ createdAt: -1 });

      res.status(200).send({
          success: true,
          message: "Electrician Data",
          info,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error in Get Technician API",
          error,
      });
  }
};


//get plumber info
const getPlumberController = async (req, res) => {
  try {
      const info = await informationModel.find({ job: { $regex: /Plumber/i } })
          .populate("createdBy", "_id firstName lastName image")
          .sort({ createdAt: -1 });

      res.status(200).send({
          success: true,
          message: "Plumber Data",
          info,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error in Get Technician API",
          error,
      });
  }
};


//get maid info
const getMaidController = async (req, res) => {
  try {
      const info = await informationModel.find({ job: { $regex: /Maid/i } })
          .populate("createdBy", "_id firstName lastName image")
          .sort({ createdAt: -1 });

      res.status(200).send({
          success: true,
          message: "Maid Data",
          info,
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success: false,
          message: "Error in Get Technician API",
          error,
      });
  }
};

//get info user
const getUserInfoController = async (req, res) =>{
    try {
      const userInfo = await informationModel.find({createdBy:req.auth._id})
      res.status(200).send({
        success: true,
        message:"user information",
        userInfo,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success: false,
        message: 'Error in User Info API',
        error,
      })
    }
  };
//get all post
const getAllInfoController =  async (req, res) => {
  try{
    const infos = await informationModel.find().populate("createdBy", "_id firstName lastName location" ).sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        message: "All Infos Data",
        infos,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In getall info API",
      error,
    });
  }
};

  
  

  module.exports = {getPlumberController,getAllInfoController,  getUserInfoController, getMaidController,createInformationController, getElectricianController, getCarpenterController, getTechnicianController, getDriverController};