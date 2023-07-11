import React, { useEffect, useState } from "react";

import styles from "./About.module.css";
import { fetchAboutData,fetchProfiledata } from "../../api/userapi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import PostList from "../Profile/ProfileTabs/PostList/PostList";
import FollowProfileButton from "../Profile/FollowProfileButton/FollowProfileButton";
import Card from "../Card/Card";

const About = ({_id,handleClick =()=>{},main = true}) => {
  const [aboutData, setAboutData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  console.log(_id)


  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data
        if(main){
           data = await fetchAboutData();

        }else{
          data = await fetchProfiledata(_id);
        }
      
        setAboutData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [_id,main]);




 
  return (
    <div className={styles.aboutPage}>


    
  
      {aboutData ? (
        <div className={styles.container}>
        <div className = {styles.aboutContainer}>
        
          <img
            src={aboutData.photoURL}
            alt="profile"
            className={styles.aboutimg}
          />

          <div className={styles.creditials}>
          <h2 className={styles.userName}>{aboutData.userName}</h2>
          <p className={styles.userEmail}>{aboutData.email}</p>
          </div>
          <button className={styles.button} onClick={handleClick}>
          {main?<FontAwesomeIcon icon={faTrashAlt} beat size="lg" />:<FollowProfileButton followingId= {_id}/>}
          
        </button>
      
          </div>
          <p className={styles.about}>{aboutData.about}</p>
          <p className ={styles.date}>Joined in
        <b>
          {`      ${new Date(aboutData.date).getFullYear()}-${new Date(aboutData.date).getMonth()}-${new Date(aboutData.date).getDate()}`}</b></p>
          
     
          <div className={styles.gridContainer}>
            <h3
              onClick={() => {
                setActiveTab((x) => 0);
              }}
            >
              Posts
              {activeTab === 0 ? (
                <div className={styles.MuiTabsIndicator} />
              ) : null}
            </h3>
          
            <h3
              onClick={() => {
                setActiveTab((x) => 1);
              }}
            >
              Following
              {activeTab === 1 ? (
                <div className={styles.MuiTabsIndicator} />
              ) : null}
            </h3>
            <h3
              onClick={() => {
                setActiveTab((x) => 2);
              }}
            >
              Followers
              {activeTab === 2 ? (
                <div className={styles.MuiTabsIndicator} />
              ) : null}
            </h3>
          </div>
          
          <div className={activeTab === 0 ? styles.activeTab : styles.tab}>
            {aboutData.posts.map((post, index) => {
           
              const data = {
                ...post._doc,
                photoURLs: [...post.photoURLs],
                userPhotoUrl: aboutData.photoURL,
                username: aboutData.userName,
              };
              return <PostList data={data} key={index} />;
            })}
          </div>
          <div className={activeTab === 1 ? styles.activeTab : styles.tab}>
        {aboutData.following.map((following,index) => <Card userName={following.userName} key={index}  photoUrl = {following.photoURL}   _id = {following._id}/>)}
          
          </div>
          <div className={activeTab === 2 ? styles.activeTab : styles.tab}>
          {aboutData.followers.map((followers,index) =>  <Card userName={followers.userName} key={index}  photoUrl = {followers.photoURL}   _id = {followers._id}/>)}
           
           
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default About;
