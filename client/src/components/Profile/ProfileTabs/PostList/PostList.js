import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaComment } from 'react-icons/fa';
import styles from "./PostList.module.css";
import {handleLikes } from '../../../../api/postapi';
import CommentSection from './Post/Comment/Comment';


const PostList = ({ data }) => {

  const [likesCount,setLikesCount] =useState([...data.likes]);


  const [commentsCount,setCommentsCount] =useState([...data.comment]);

  const userId = localStorage.getItem("_id");
  const handlelikes = ()=>{

  


  if (likesCount.includes(userId)) {
    setLikesCount(likesCount => likesCount.filter(id => id !== userId));
  } else {
    setLikesCount(likesCount => [...likesCount, userId]);
  }
    

    handleLikes({userId:userId,postId:data._id});

  }

    const photos = data.photoURLs
      .slice(0, 6)
      .map((photoUrl, index) => (
        <img src={photoUrl} key={`${data._id}${index}`} alt={data._id} />
      ));

  
    return (
      <div className={styles.post} key={data._id}>
        <div className={styles.postHeader}>
          <img className={styles.postAvatar} src={data.userPhotoUrl} alt={data._id} />
          <div className={styles.postAuthor}>{data.username}</div>
        </div>

        <Card className={styles.postGrid}>
          <Card.Title className={styles.postText}>{data.postText}</Card.Title>
          <div className={styles.postPhotos}>
            {photos}
            {data.photoURLs.length > 6 && (
              <div className={styles.morePhotos}>+{data.photoURLs.length - 6} more</div>
            )}
          </div>

         
        </Card>
        <div className={styles.postFooter}>
        <div className={styles.postFooterItem} onClick = {handlelikes}>
          <FaHeart className={styles.postFooterIcon} />
          <div className={styles.postFooterText}>{likesCount.length}</div>
        </div> 
        <div className={styles.postFooterItem}>
              
          <FaComment className={styles.postFooterIcon} />
          <div className={styles.postFooterText}>{commentsCount.length}</div>
        </div>
      
     
       
        
      </div>
      <CommentSection comments = {commentsCount} postId = {data._id} setCommentsCount = {setCommentsCount} />
      </div>
    );
  };

  
;

export default PostList;
