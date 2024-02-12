const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { createPostController, getAllPostsController, getUserPostPostsController, deletePostController, updatePostController } = require("../controllers/postController");
//router object
const router = express.Router();


//create psot
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsController);

//GET USER POSTs
router.get("/get-user-post", requireSignIn, getUserPostPostsController);

//DELETE USER POST
router.delete('/delete-post/:id', requireSignIn, deletePostController )

//UPDATE USER POST
router.put('/update-post/:id', requireSignIn, updatePostController );




//export
module.exports = router;