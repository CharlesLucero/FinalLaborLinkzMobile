const postModel = require("../models/postModel");

// create post
const createPostController = async (req, res) => {
  try {
    const { title, description, minRate, maxRate} = req.body;
    //validate
    if (!title || !description || !minRate || !maxRate) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const post = await postModel({
        title,
        description,
        minRate,
        maxRate,
        postedBy: req.auth._id,
      }).save();

    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in Create Post APi",
      error,
    });
  }
};

//get all post
const getAllPostsController =  async (req, res) => {
  try{
    const posts = await postModel.find().populate("postedBy", "_id firstName lastName location" ).sort({ createdAt: -1 });
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
const getUserPostPostsController = async (req, res) =>{
  try {
    const userPosts = await postModel.find({postedBy:req.auth._id})
    res.status(200).send({
      success: true,
      message:"user posts",
      userPosts
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: 'Error in User Post API',
      error,

    })
  }
};
//delete post
const deletePostController = async (req, res) =>{
    try {
      const {id} = req.params
      await postModel.findByIdAndDelete({_id:id})
      res.status(200).send({
        success: true,
        message: "Your Post been deleted"
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error in delete post api",
        error,
      })
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
    const updatedPost = await postModel.findByIdAndUpdate({ _id:req.params.id },
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
    })

    } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errr in update post api",
      error,
    });
  }
}

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
}








module.exports = {createPostController, getTotalPostsController,viewUserProfileController ,updatePostController, getAllPostsController, deletePostController, getUserPostPostsController};