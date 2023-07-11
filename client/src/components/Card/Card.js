import styles from "./Card.module.css"

import FollowProfileButton from "../Profile/FollowProfileButton/FollowProfileButton";
import  {Eye} from 'react-bootstrap-icons';
import { useNavigate } from "react-router";

import  { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
const Card = (props) =>{
    let {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("hello world!")
    navigate(`user/${props._id}`)
        }

  
 
    



    return (
        <div className={styles.Card}>

        <div className = {styles.container}>
        <img src = {props.photoUrl} className = {styles.images} alt = "profile"/>
        </div>
       
        <h2 className = {styles.userName}>
        {props.userName}
        </h2>
        <div className = {styles.eyeIcon} onClick = {handleClick}>
        <Eye size = "30" color = "green"  />
        </div>
        
        {isAuthenticated?
  
        <FollowProfileButton followingId= {props._id}/>
        :null}
     
      
        
        </div>
    )
}
export default Card; 