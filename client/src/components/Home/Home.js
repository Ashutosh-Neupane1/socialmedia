

import Post from "./Post/Post"
import styles from "./Home.module.css"
import UserTofollow from '../UserTofollow/UserTofollow';



const HomePage = (props) => {

  const isMobile = window.innerWidth <= 768? true : false;
 

  return (
  <div className={styles.homepage}> 
  <div className ={styles.post}>
  <Post/>
  </div>
  {!isMobile?
    <div  className = {styles.UserTofollow}>
    <UserTofollow/>
    </div>
  :null}

  
  </div>)
  
};
export default HomePage;
