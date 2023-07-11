import styles from "../SignIn/SignIn.module.css";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';

import axios from "axios";

const Login =  ()=>{
    const { setIsAuthenticated } = useContext(AuthContext);

    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleChange = (event)=>{
        if(event.target.className ===styles.email){
            setEmail(x =>event.target.value)
        }else if(event.target.className ===styles.password){
            setPassword(x =>event.target.value);
        }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.create({credentials:"include",withCredentials:true}).post('http://localhost:5000/auth/signin', {
          email: email,
          password: password
        },  );
   console.log(response.headers);
 
        // Login successful, handle the response
        
    
        const { token,user } = response.data;
        
        

        
        
        // Save the token and user data in the browser's local storage or state
        localStorage.setItem('token', token);
        localStorage.setItem("_id",user._id);
        
      
    
        setIsAuthenticated(true);

        // Redirect to the desired page or update the UI accordingly
      } catch (error) {
        console.error('Login error:', error.message);
        // Handle the error, display an error message, etc.
      }
            navigate('/')
    };
    return (
        <div className = {styles.Signin}>
        <h1 className = {styles.signInHeader}>
        Log In
        </h1>
        
        <form >
      
        <div className = {styles.formGroup}>
        <label htmlFor = {styles.email}>Email:</label>
        <input type = "email" className={styles.email} value={email} onChange={handleChange}/>

        </div>
        <div className = {styles.formGroup}>
        
        
        <label htmlFor = {styles.password}>Password:</label>
        <input type ="password" className={styles.password} value = {password} onChange={handleChange}/>
        </div>
        <button type="button" onClick={handleSubmit} className={styles.SignInButton}>Login</button>
        </form>
        </div>
    )
}
export default Login;