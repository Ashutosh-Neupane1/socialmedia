const express = require("express");
const Router = express.Router();
const configureUpload = require("../Multer");

const upload = configureUpload("uploads");



const {
  create,
  list,
  remove,

  getById,
  update,
  unfollowUser,
 followUser,
 getTofollow
} = require("../controllers/user.controller");
const{auth} = require("../controllers/auth.controller");
Router.put("/api/users/follow",auth,followUser);
Router.put("/api/users/unfollow",auth,unfollowUser);

Router.route("/api/users").get(list).post(upload.single('photo'),create);

Router.route("/api/users/:userId")
 
  .put(upload.single('photo'),auth,update)
  .delete(auth,remove);
  
Router.get("/userTofollow/:_id",auth,getTofollow);

Router.get("/:userId",auth,getById);

module.exports =  Router;
