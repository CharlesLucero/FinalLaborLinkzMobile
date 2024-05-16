const informationModel = require("../models/informationModel");

//create information 
const createInformationController = async (req, res) => {
  try {
    const existingInfo = await informationModel.findOne({ createdBy: req.auth._id });
    if (existingInfo) {
      return res.status(400).send({
        success: false,
        message: "User already has existing information",
      });
    }


    const { bio, age, job } = req.body;
    //validate
    if (!bio || !age || !job ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const info = await informationModel({
      bio,
      age,
      job,
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
        .populate({
          path: "createdBy",
          select: "_id firstName lastName location image contactNumber rating",
          populate: [
            { path: "province", select: "name" },
            { path: "city", select: "name" },
            { path: "barangay", select: "name" }
          ]
        })
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
      .populate({
        path: "createdBy",
        select: "_id firstName lastName location image contactNumber rating",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" }
        ]
      })
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
      .populate({
        path: "createdBy",
        select: "_id firstName lastName location image contactNumber rating",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" }
        ]
      })
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
      .populate({
        path: "createdBy",
        select: "_id firstName lastName location image contactNumber rating",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" }
        ]
      })
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
      .populate({
        path: "createdBy",
        select: "_id firstName lastName location image contactNumber rating",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" }
        ]
      })
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
      .populate({
        path: "createdBy",
        select: "_id firstName lastName location image contactNumber rating",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" }
        ]
      })
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
      .populate({
        path: "createdBy",
        select: "_id   location ",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" }
        ]
      })
      .sort({ createdAt: -1 });
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
    const infos = await informationModel.find().populate("createdBy", "_id firstName lastName image" ).sort({ createdAt: -1 });
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

// Update information
const updateInformationController = async (req, res) => {
  try {
    const { bio, age, job } = req.body;

    const info = await informationModel.findById({_id: req.params.id});

    // Validate
    if (!bio || !age || !job ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    
    const updatedInfo = await informationModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        bio:bio || info?.bio,
        age:age || info?.age,
        job:job || info?.job
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Information Updated Successfully",
      info: updatedInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Info API",
      error,
    });
  }
};

  

  module.exports = {getPlumberController,getAllInfoController, updateInformationController,  getUserInfoController, getMaidController,createInformationController, getElectricianController, getCarpenterController, getTechnicianController, getDriverController};
