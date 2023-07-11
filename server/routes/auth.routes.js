const {
  signIn,
  signOut,
  
  
} = require("../controllers/auth.controller");
const express  = require("express");
const router = express.Router();
router.route("/auth/signin").post(signIn);

router.route("/auth/signout").get(signOut);
module.exports =  router;
