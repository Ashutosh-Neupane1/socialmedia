import styles from "./SignIn.module.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import {useState} from "react"

const SignIn = ()=>{
    const navigate=useNavigate();
    const [userName ,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [ about, setAbout]= useState("");
    const [photo, setSelectedPhoto] = useState(null);
    let data = {
        userName :userName,
        email:email,
        password:password,
        photo:photo,

    }
    const handleChange = (event)=>{
        if(event.target.className ===styles.username){
            setUserName(x=>event.target.value)

        }else if (event.target.className ===styles.password){
            setPassword(x=>event.target.value)
        }else if (event.target.className ===styles.email){
            setEmail(x=>event.target.value)}
            else if(event.target.className ===styles.about){
                setAbout(x=>event.target.value)
            }else if(event.target.className ===styles.photo){
                
                const file = event.target.files[0];
                setSelectedPhoto(file);
            }

    }

    const handleClick = (e)=>{
        console.log(data.photo);
        const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("about", about);
      formData.append("photo", photo);
     
        e.preventDefault();
        axios.post("http://localhost:5000/api/users",formData).then(res=>{navigate('/')}).catch(err=>{console.log(err)})

    }
    return (
        <div className={styles.Signin}>
        <h1 className = {styles.signInHeader}>
        Sigin UP
        </h1>
        <form >
        <div className = {styles.formGroup}>
        <label htmlFor = {styles.photo}>Photo:</label>
        <input type ="file" className={styles.photo} onChange={handleChange}/>
        
          
        </div>
        <div className = {styles.formGroup}>
        <label  htmlFor = {styles.username} onChange ={handleChange}>Name:</label>
        <input type = "text" className={styles.username} value = {userName} onChange={handleChange}/>
        </div>
        <div className = {styles.formGroup}>
        <label htmlFor = {styles.email}>Email:</label>
        
        <input type = "email" className={styles.email} value={email} onChange={handleChange}/>
        </div>
        <div className = {styles.formGroup}>
        <label htmlFor = {styles.password}>Password:</label>
        <input type ="password" className={styles.password} value = {password} onChange={handleChange}/>
        </div>
        <div className = {styles.formGroup}>
        <label htmlFor = {styles.about}>About:</label>
        <input type ="text" className={styles.about} value = {about} onChange={handleChange}/>
        </div>
        
        <button type = "submit" onClick = {handleClick} className = {styles.SignInButton}>Sign In</button>

        </form>
        </div>
    )
    
}
export default SignIn