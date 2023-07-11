
const User = require('../Model/User.model');
const Post = require('../Model/post.model');
const create = async (req,res,next)=>{
  const {userName,email,password,about} = req.body;
  let {filename,path:filePath} = req.file?req.file:{fileName:null,path:null};


    const user = new User(
      {
        userName,
        email,
        password,
        about,
        photo:{
          filename,
          filePath
        }
       

      }
    );
    
  
     user.save().then(()=>console.log("user saved")).catch(err=>console.log(err));
    res.status(200).send("User Saved!")

}
const list = async (req, res, next) => {
  try {

    const users = await User.find();
    
  

    const userWithPhotoUrl = users.map(async (user) => {
      const photoURL = user.photo ? `http://localhost:5000/uploads/${user.photo.filename}` : null;

      const followers = await User.find({ following: user._id });
      const following = user.following;

      return {
        userName: user.userName,
        password: user.password,
        about: user.about,
        date: user.date,
        photoURL: photoURL,
        _id: user._id,
        email: user.email,
        followers: followers.map((follower) => follower._id),
        following: following.map((followedUser) => followedUser._id)
      };
    });

    const usersWithFollowersAndFollowing = await Promise.all(userWithPhotoUrl);

    res.status(200).json(usersWithFollowersAndFollowing);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const remove = async (req,res,next,id)=>{
    const {userId}=req.params

    try {
        const removedUser = await User.findByIdAndRemove(userId);
        if (!removedUser) {
          // User with the given ID not found
          console.log(' remove User not found');
        } else {
          console.log('User removed successfully');
        }
      } catch (error) {
        console.error('Error removing user:', error);
      }
    

}

const getById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate('followers', 'userName photo.filename') // Populate the followers field with userName and photo.filename
      .populate('following', 'userName photo.filename'); // Populate the following field with userName and photo.filename
      

    if (!user) {
      // User with the given ID not found
      console.log(' user with id not found User not found');
    } else {
      let post  = await Post.find({ createdBy:userId});
      if (!post || post.length === 0) {
        post = [];
      }
      
      const userWithPhotoUrl = {
        userName: user.userName,
        password:user.password,

        about: user.about,
        date: user.date,
        photoURL: user.photo ? `http://localhost:5000/uploads/${user.photo.filename}` : null,
        _id: user._id,
        email: user.email,
        followers: user.followers.map(follower => ({
          userName: follower.userName,
          photoURL: follower.photo ? `http://localhost:5000/uploads/${follower.photo.filename}` : null,
          _id: follower._id
        })),
        following: user.following.map(following => ({
          userName: following.userName,
          photoURL: following.photo ? `http://localhost:5000/uploads/${following.photo.filename}` : null,
          _id: following._id
        })),
        posts: post.map(post => ({
          ...post,
          photoURLs: post.photos?.map(photo => `http://localhost:5000/uploads/posts/${photo.filename}`) || []
        }))
      };
      
      res.status(200).json(userWithPhotoUrl);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const update = async (req, res, next) => {

  const { userId } = req.params;
  const { userName, email, password, about } = req.body;
  let { filename, path: filePath } = req.file ? req.file : { filename: null, path: null };
  
  try {
    const user = await User.findById(userId); // Retrieve the user from the database
    
    // Retain the reference to the previous photo if a new photo is not provided
    if (!filename || !filePath) {
      filename = user.photo.filename;
      filePath = user.photo.filePath;
    }

    const updatedData = {
      userName,
      email,
      password,
      about,
      photo: {
        filename,
        filePath
      }
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const followUser = async (req, res) => {
 
  try {
    const { userId, followId } = req.body;
    

    const user = await User.findById(userId);
    const followUser = await User.findById(followId);

    if (!user || !followUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    

    if (user.following.includes(followId) || followUser.followers.includes(userId)) {
      return res.status(400).json({ error: 'User is already followed' });
    }

    user.following.push(followId);
    followUser.followers.push(userId);

    await user.save();
    await followUser.save();

    res.json({ message: 'User followed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while following user' });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId, unfollowId } = req.body;

    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowId);

    if (!user || !unfollowUser) { 
      return res.status(404).json({ error: ' unfollow User User not found' });
    }

    if (!user.following.includes(unfollowId) || !unfollowUser.followers.includes(userId)) {
      return res.status(400).json({ error: 'User is not followed' });
    }

    user.following = user.following.filter((id) => id.toString() !== unfollowId);
    unfollowUser.followers = unfollowUser.followers.filter((id) => id.toString() !== userId);

    await user.save();
    await unfollowUser.save();

    res.json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while unfollowing user' });
  }
};
const getTofollow = async (req, res, next) => {
  try {

    const { _id } = req.params

    const user = await User.findById(_id);
    const following = user.following;
    // Add the current user's ID to the "following" array
    following.push(_id);

    // Find users who are not in the "following" array
    const users = await User.find({ _id: { $nin: following } }, 'userName _id email photo');

    const usersWithPhotoUrl = users.map((user) => {
      let photoUrl = `http://localhost:5000/uploads/${user.photo.filename}`;
      
      return {
        userName: user.userName,
        _id: user._id,
        email: user.email,
        photoUrl: photoUrl,
      };
    });

    res.json(usersWithPhotoUrl);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes

    // Send an error response with a status code of 500 (Internal Server Error)
    res.status(500).json({
      error: 'An error occurred while fetching data',
    });
  }
};






module.exports =   {
    create:create,
    list:list,
    remove:remove,
    followUser:followUser,
    unfollowUser:unfollowUser,
    getTofollow:getTofollow,

   
    getById:getById,
    update:update,
}