import axios from "axios";
import { Navigate } from "react-router-dom";
const token = localStorage.getItem("token");
const _id = localStorage.getItem("_id");

const baseURL = "http://localhost:5000"; // Base URL for API requests

const Authorization = {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
};

export const fetchPost = async () => {
  try {
    const response = await axios.get(`${baseURL}/posts`, Authorization);
    
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (data) => {
  try {
    console.log(data);
    await axios.post(`${baseURL}/posts`,data, Authorization);
  
    <Navigate to="/"/>; // Redirect to the home page after creating a post
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async () => {
  try {
    await axios.delete(`${baseURL}/posts/${_id}`, Authorization);
    <Navigate to ="/"/> // Redirect to the home page after deleting a post
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async () => {
  try {
    await axios.put(`${baseURL}/posts/${_id}`, Authorization);
   <Navigate to ="/"/> // Redirect to the home page after updating a post
  } catch (err) {
    console.log(err);
  }
};
 export const handleLikes = async (data)=>{
  console.log(data)
  try {
    await axios.post(`${baseURL}/likes`,data,Authorization)
  }catch(err){
    console.log(err);
  }
}
export const handleComments = async (data)=>{
  try {
    await axios.post (`${baseURL}/comments`,data,Authorization)
  }catch(err){
    console.log(err);

  }
}
