
const postModel = require("../models/postModel");
const multer = require("multer");

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

// create post
const createPostController = async (req, res) => {
  try {
    const { title, description, minRate, maxRate } = req.body;

    // Validate input fields
    if (!title || !description || !minRate || !maxRate) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }


    let first = "";
    let second = "";
    let third = "";

    first = req.files[0].filename;
    second = req.files[1].filename;
    third = req.files[2].filename;


    // Create a new post
    const post = await postModel.create({
      title,
      description,
      minRate,
      maxRate,
      "postPics.first": first,
      "postPics.second": second, 
      "postPics.third": third,
    postedBy: req.auth._id,
    });

    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Post API",
      error,
    });
  }
};

//get all post
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate({
        path: "postedBy",
        select: "_id firstName lastName verified rating",
        populate: [
          { path: "province", select: "name" },
          { path: "city", select: "name" },
          { path: "barangay", select: "name" },
        ],
      })
      .sort({ createdAt: -1 });
    console.log(posts);
    res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GETALLPOSTS API",
      error,
    });
  }
};

//get user post
const getUserPostPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User Post API",
      error,
    });
  }
};

//delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};
//UPDATE POST
const updatePostController = async (req, res) => {
  try {
    const { title, description, minRate, maxRate } = req.body;
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title || !description || !minRate || !maxRate) {
      return res.status(500).send({
        success: false,
        message: "Please Provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
        minRate: minRate || post?.minRate,
        maxRate: maxRate || post?.maxRate,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post Updated Successfull",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errr in update post api",
      error,
    });
  }
};

const viewUserProfileController = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed in the request params
    // Query posts associated with the user
    const userPosts = await postModel.find({ postedBy: userId });
    if (!userPosts) {
      return res.status(404).send({
        success: false,
        message: "No posts found for this user.",
      });
    }
    res.status(200).send({
      success: true,
      message: "User posts retrieved successfully.",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving user posts.",
      error,
    });
  }
};

const getTotalPostsController = async (req, res) => {
  try {
    const totalPosts = await postModel.countDocuments();
    res.status(200).send({
      success: true,
      message: "Total number of posts",
      totalPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting total number of posts",
      error,
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


module.exports = {
  createPostController,
  getTotalPostsController,
  viewUserProfileController,
  updatePostController,
  getAllPostsController,
  deletePostController,
  getUserPostPostsController,
  uploadImage,
  upload
};