const express = require("express");
const Router = express.Router();
const {
  read,
  create,
  update,
  remove,
  handleComment,
  handleLikes
} = require("../controllers/post.controller");
const configureUpload = require("../Multer");

const upload = configureUpload("uploads/posts");
const { auth } = require("../controllers/auth.controller");


Router.route("/posts").
get(read).
post(auth, upload.array("photos"), create);

Router.route("/posts/:postId")
  .post(auth, upload.array("photos"), update)
  .delete(auth, remove);
  Router.post("/likes",auth,handleLikes);
  Router.post("/comments",auth,handleComment);
module.exports = Router;
