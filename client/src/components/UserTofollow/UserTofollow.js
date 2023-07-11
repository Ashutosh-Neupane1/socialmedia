import axios from 'axios'; 
import {useEffect,useState} from 'react'
import Card from "../Card/Card";
const UserTofollow = ()=>{
    const [data, setData] = useState([]);
    

  
  
  useEffect(()=>{
   
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const _id = localStorage.getItem("_id");

    
        const response = await axios.get(`http://localhost:5000/userTofollow/${_id}`, {
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        setData(response.data);
      } catch (error) {
        console.error(error); // Log the error for debugging purposes
        // Handle the error or display an error message
      }
    };
    
  fetchData();
}
  ,[])
  


  let arr = data?.map((data) =>{
   

    return(
  

    
    <Card userName={data.userName} key={data._id}  photoUrl = {data.photoUrl}   _id = {data._id}/>)}
  )
    return (
        <>
  <h1>
  Person To follow
  </h1>
  {arr}
  </>
    )
}
export default UserTofollow;