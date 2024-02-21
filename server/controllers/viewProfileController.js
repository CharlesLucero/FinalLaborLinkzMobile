const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const informationModel = require("../models/informationModel");

const getUserProfileDataController = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed in the request params

    // Query user information
    const userInfo = await userModel.findById(userId);

    if (!userInfo) {
      return res.status(404).send({
        success: false,
        message: "User not found.",
      });
    }

    // Query posts associated with the user
    const userPosts = await postModel.find({ postedBy: userId });

    // Query additional information associated with the user
    const userAdditionalInfo = await informationModel.findOne({ createdBy: userId });

    res.status(200).send({
      success: true,
      message: "User profile data retrieved successfully.",
      userInfo,
      userPosts,
      userAdditionalInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving user profile data.",
      error,
    });
  }
};

module.exports = { getUserProfileDataController };
