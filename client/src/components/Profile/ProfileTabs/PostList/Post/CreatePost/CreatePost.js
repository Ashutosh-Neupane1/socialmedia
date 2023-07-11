import React, { useState } from 'react';
import { createPost } from '../../../../../../api/postapi';
import { PlusCircle } from "react-bootstrap-icons";
import   "./CreatePost.css"

import Card from 'react-bootstrap/Card';


const CreatePost = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleWindowClick = (e) => {
    
  
    
    setIsExpanded(x=>!x);
  };
  const handleClick = (e) => {
    e.stopPropagation();
  }

  const handleChange = (event) => {
    const selectedPhotos = Array.from(event.target.files);
 
    setPhotos(selectedPhotos);
  };

  const handleSubmit = (event) => {
 
    event.preventDefault();

    // Create a new FormData object to hold the data
    const formData = new FormData();
    formData.append('content', content);
    photos.forEach((photo) => {
      formData.append('photos', photo);
    });
    formData.append("_id",localStorage.getItem('_id'));

    // Call the createPost function with the form data
    createPost(formData)
      .then((response) => {
        // Handle successful post creation
   
        setPhotos([]);
        setContent('');
      })
      .catch((error) => {
        // Handle error
        console.error('Error creating post:', error);
      });
  };

  return (
    isExpanded?
    <div  onClick={handleWindowClick}>
   
    <Card className = "homeCreatePost" tag = "a"
    style={{ cursor: "pointer" }}
    >
  
    <PlusCircle color = "black" width = "2rem"
    height = "2rem"

    />
    

    <h1>Create New Post</h1>
    
    </Card>
    </div>
    :
  <div className = "overlay">

    <div
      className={`create-post-window expanded`}
      onClick={handleWindowClick}
    >
      <h3 onClick ={handleClick}>Create a New Post</h3>
      <form >
        <div onClick= {handleClick} >
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        <div  onClick = {handleClick}>
          <label htmlFor="postPhotos">Photos:</label>
          <input
            type="file"
            id="postPhotos"
            onChange={handleChange}
            multiple
          />
        </div>
        <button type="submit" onClick = {handleSubmit}>Submit</button>
      </form>
 
    </div>
    </div>
    
  );
};

export default CreatePost;
