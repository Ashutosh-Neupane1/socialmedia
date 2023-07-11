import About from "./About";
import { useParams } from "react-router-dom";
const Profile = ()=>{
    const {_id}= useParams();
   
  
    return (
        <>
        <About _id = {_id} main = {false}/>
        </>
    )

}
export default Profile;