const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { createPostController, getAllPostsController,getTotalPostsController, getUserPostPostsController, deletePostController, updatePostController, viewUserProfileController } = require("../controllers/postController"); // Include the new controller
//router object
const router = express.Router();

//create post
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsController);

//GET USER POSTs
router.get("/get-user-post", requireSignIn, getUserPostPostsController);

//DELETE USER POST
router.delete('/delete-post/:id', requireSignIn, deletePostController )

//UPDATE USER POST
router.put('/update-post/:id', requireSignIn, updatePostController );

// View user profile and display posts
router.get('/user/:userId/posts', requireSignIn, viewUserProfileController); // New route for viewing user profile and posts

router.get("/total-post", getTotalPostsController);
//export
module.exports = router;
