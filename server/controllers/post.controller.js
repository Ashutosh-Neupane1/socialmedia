const Post = require("../Model/post.model");
const User = require("../Model/User.model");

const create = async (req, res, next) => {
  const { comment, likes, content: postText, _id } = req.body;

  const photos = req.files?.map((file) => ({
    filename: file.filename,
    filePath: file.path,
  })) || [];
  console.log(photos);

  const newPost = new Post({
    comment,
    likes,
    postText,
    photos,
    createdBy: _id
  });

  try {
    await newPost.save();
    console.log("Post saved successfully");
    res.sendStatus(200);
  } catch (err) {
    console.log("Error saving post:", err);
    res.sendStatus(500);
  }
};

const update = async (req, res, next) => {
  const { post_id } = req.params;
  const { comment, likes, postText } = req.body;
  let { filename, path: filePath } = req.file || { filename: null, path: null };

  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (!filename || !filePath) {
      filename = post.photos[0].filename;
      filePath = post.photos[0].filePath;
    }

    post.comment = comment;
    post.likes = likes;
    post.postText = postText;

    // Update the photo only if a new file is provided
    if (filename && filePath) {
      post.photos = [{
        filename,
        filePath,
      }];
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const remove = async (req, res, next) => {
  const { _id } = req.params;

  try {
    const removedPost = await Post.findByIdAndRemove(_id);
    if (!removedPost) {
      console.log('Post not found');
      res.status(404).json({ error: 'Post not found' });
    } else {
      console.log('Post removed successfully');
      res.sendStatus(200);
    }
  } catch (error) {
    console.error('Error removing post:', error);
    res.sendStatus(500);
  }
};

const read = async (req, res, next) => {
  try {
    const posts = await Post.find();
    const postsWithPhotoURL = await Promise.all(posts.map(async (post) => {
      const photoURLs = post.photos.map((photo) => `http://localhost:5000/uploads/posts/${photo.filename}`);

      const user = await User.findById(post.createdBy);
  
      const UserPhotoUrl = `http://localhost:5000/uploads/${user.photo.filename}`;
      const comment = await Promise.all(post.comment.map( async (comment) => {
        const user = await User.findById(post.createdBy);
  
        const UserPhotoUrl = `http://localhost:5000/uploads/${user.photo.filename}`;
        return (
          {
            commentText:comment.commentText,
            commentedByPhotoURL:UserPhotoUrl,
            username :user.userName,
            _id:comment._id,
          }
        )
        
      }))

      return {
        ...post._doc,
        comment,
        username:user.userName,
        userPhotoUrl:UserPhotoUrl,
        photoURLs: post.photos.length > 0 ? photoURLs : null,
      };
    }));
 
    res.json(postsWithPhotoURL);
  } catch (error) {
    console.error('Error reading posts:', error);
    res.sendStatus(500);
  }
};

const handleLikes = async (req, res, next) => {
  try {
    const postId = req.body.postId;
    const userId = req.body.userId;
  

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const userLikedIndex = post.likes.indexOf(userId);

    // Check if the user has already liked the post
    if (userLikedIndex !== -1) {
      // User has already liked the post, so remove their ID from the likes array
      post.likes.splice(userLikedIndex, 1);
    } else {
      // User hasn't liked the post, so add their ID to the likes array
      post.likes.push(userId);
    }

    // Save the updated post
    await post.save();

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling likes:', error);
    res.sendStatus(500);
  }
};
const handleComment = async (req,res,next) => {
  try{

  const postId = req.body.postId;
  const userId = req.body.userId;

  const comment = {
    commentText:req.body.commentText,
    commentedBy:userId

  }
  const post = await Post.findById(postId);
  if(!post){
    res.status(404).json({error:"post not found "});
  }
  post.comment.push(comment);
  await post.save();

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling likes:', error);
    res.sendStatus(500);
  }
}
module.exports = {
  create,
  update,
  remove,
  read,
  handleLikes,
  handleComment,
};
