import express from "express";
import userAuth from "../middleware/authMiddleware.js";
import { createPost, getPosts, getPost, getUserPost, getComments, likePost, likePostComment, commentPost, replyPostComment, deletePost } from "../controllers/postController.js";

const router= express.Router();

//create post
router.post("/create-post", userAuth, createPost);

//get posts
router.post("/", userAuth, getPosts); // get all posts
router.post("/:id", userAuth, getPost); // get a post by its id
router.post("/get-user-post/:id", userAuth, getUserPost); // get posts by a user by their id

//get comments
router.get("/comments/:postId", getComments); //get comments of a post

//like a post
router.post("/like/:id", userAuth, likePost);
router.post("/like-comment/:id/:rid?", userAuth, likePostComment); //like a comment on a post or like a reply to a comment if it exists

//comment on a post
router.post("/comment/:id", userAuth, commentPost);
router.post("/reply-comment/:id", userAuth, replyPostComment); // reply to a comment on a post

//delete post
router.delete("/:id", userAuth, deletePost);

export default router;