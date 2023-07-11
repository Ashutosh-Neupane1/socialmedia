import styles from "./EditProfile.module.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";


const EditProfile = () => {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setPhoto] = useState(null);
  const _id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { userName, email, password, about, photo } = response.data;
      setUserName(userName);
      setEmail(email);
      setPassword(password);
      setAbout(about);
      setPhoto(photo);
      // Set the photo state based on the photo received from the response
      
    } catch (error) {
      console.error(error);
    }
  }, [_id, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event) => {
    const { className, value, files } = event.target;
    if (className === styles.username) {
      setUserName(value);
    } else if (className === styles.password) {
      setPassword(value);
    } else if (className === styles.email) {
      setEmail(value);
    } else if (className === styles.about) {
      setAbout(value);
    } else if (className === styles.photo) {
      const file = files[0];
      setPhoto(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Create a FormData object to send the updated profile data
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("about", about);
      formData.append("photo", photo);

      await axios.put(`http://localhost:5000/api/users/${_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.Signin}>
      <h1 className={styles.signInHeader}>Edit Photo</h1>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor={styles.photo}>Photo:</label>
          <input
          alt = "profile picture"
            type="file"
            className={styles.photo}
            onChange={handleChange}
            
            
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={styles.username}>Name:</label>
          <input
            type="text"
            className={styles.username}
            value={userName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={styles.email}>Email:</label>
          <input
            type="email"
            className={styles.email}
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={styles.password}>Password:</label>
          <input
            type="password"
            className={styles.password}
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={styles.about}>About:</label>
          <input
            type="text"
            className={styles.about}
            value={about}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleClick}>
          Edit Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
