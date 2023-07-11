const User = require('../Model/User.model');
const jwt = require('jsonwebtoken');




const signIn = async (req, res, next) => {
  
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }
   

    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) {
      return res.status(401).json("Wrong password");
    }
  
    const token = jwt.sign({ _id: user._id }, 'your-token', { expiresIn: '1h' });
    res.cookie('t', token, { expire: new Date(new Date() + 60 * 60 * 1000),httpOnly:true,sameSite:"None",secure:true});
 
    
    
    
    return res.json({
     token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signOut = async (req, res, next) => {


  res.clearCookie('t');
  return res.status(200).json({ message: "Signout successful" });
  
};

const auth = async (req, res, next) => {
  
  let token = req.headers.authorization;
  
  
  if(token){
    token = token.split(" ")[1];
   
  jwt.verify(token,"your-token",(err,decodedToken)=>{
    if(err){
      res.status(401).json({message:"User can't access this page"});
    }else{
     
      next();
    }
   })

  }else{
    return res.status(401).json({message:"User can't access this page"})
  }
  
  
}

module.exports = {
  signIn,
  signOut,
  auth
  
};
