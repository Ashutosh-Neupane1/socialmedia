import React, { useState} from 'react';
import { handleComments} from '../../../../../../api/postapi';
import { FaChevronRight } from 'react-icons/fa';
import {Card} from "react-bootstrap"
import styles from "./Comment.module.css"


const CommentSection = ({ comments, postId ,setCommentsCount}) => {
  
  const [newComment, setNewComment] = useState("");
  const userId = localStorage.getItem("_id");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
     setCommentsCount(comments=>[...comments,{commentText:newComment,userId}]);

    try {
      // Make a POST request to save the new comment'
      handleComments({userId:userId,postId:postId,commentText:newComment});
      
      // Clear the comment input field
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2>Comments</h2>
      <ul className={styles.commentList}>
        {comments.map((comment,index) => (
          <li key={index}>
          
          <Card style={{ height: '5rem',backgroundColor:"#f2f2f2" , width:"100%"}} key  = {index}>
          <div className= {styles.commentdata}>
          <img src = {comment.commentedByPhotoURL}/>
          <h5>{comment.username}</h5>
          </div>
          <span className = {styles.commentText}>
          {comment.commentText}
          </span>
          </Card>
          </li>
        ))}
      </ul>
      <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit">< FaChevronRight size = "30" className={styles.rightArrow}/></button>
      </form>
    </div>
  );
};

export default CommentSection;
