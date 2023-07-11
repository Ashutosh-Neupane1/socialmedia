import { useEffect, useState } from "react";
import CreatePost from "../../Profile/ProfileTabs/PostList/Post/CreatePost/CreatePost";
import PostList from "../../Profile/ProfileTabs/PostList/PostList";
import { fetchPost } from "../../../api/postapi";

const Post = () => {
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetchPost();
        setPosts(postData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const postList = posts.map(data => <PostList data= {data} key={data._id}/>)


  return (
    <div className="post">
      <CreatePost />
      {postList}

      
    </div>
  );
};

export default Post;
