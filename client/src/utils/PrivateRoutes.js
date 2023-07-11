import {Navigate , Outlet } from "react-router-dom";
import {useContext} from "react"
import { AuthContext } from '../AuthContext';
const PrivateRoutes = ()=>{
   
    const{ isAuthenticated}= useContext(AuthContext);
   
    if (isAuthenticated === null) {
        // Authentication is still in progress, render a loading state
        return <div>Loading...</div>;
      }


  
    
   
  


    
    return isAuthenticated ? <Outlet/> :<Navigate to="/Login"/>

    
}
export default PrivateRoutes;