import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
const SignOut =   () => {
  const {setIsAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await axios.get("http://localhost:5000/auth/signout");
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate("/")
        
      } catch (error) {
        console.log(error);
      }
    };

    handleSignOut();
  }, [setIsAuthenticated,navigate]);

  return null; // Placeholder return statement as this component doesn't render anything
};

export default SignOut;
