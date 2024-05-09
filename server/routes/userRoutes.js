import express from "express";
import path from "path";
import { requestPasswordReset, verifyEmail, resetPassword, changePassword, getUser, updateUser, friendRequest, getFriendRequest, acceptRequest, profileViews, suggestedFriends } from "../controllers/userController.js";
import userAuth from "../middleware/authMiddleware.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

//Password Reset
router.post("/request-passwordreset", requestPasswordReset); //request for password reset link
router.get("/reset-password/:userId/:token", resetPassword); //when click on the link, this route id directed and link is verified
router.post("/reset-password", changePassword); // after filling the reset password form and clicking on submit, this route is used

//user routes
router.post("/get-user/:id", userAuth, getUser);
router.put("/update-user", userAuth, updateUser);

//friend request
router.post("/friend-request", userAuth, friendRequest); // send friend request
router.post("/get-friend-request", userAuth, getFriendRequest); // fetch all requests we have on our account

//accept or deny friend request
router.post("/accept-request", userAuth, acceptRequest);

//view profile
router.post("/profile-view", userAuth, profileViews);

//suggested friends
router.post("/suggested-friends", userAuth, suggestedFriends);

router.get("/verified", (req,res) => {
    res.sendFile(path.join(__dirname,"./views/build", "index.html"));
})
router.get("/resetpassword", (req,res) => {
    res.sendFile(path.join(__dirname,"./views/build", "index.html"));
})

export default router;