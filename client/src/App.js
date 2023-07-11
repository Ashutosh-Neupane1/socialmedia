
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Home/Home';
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./components/SignIn/Signin";
import SignOut from "./components/SignOut";
import Login from "./components/Login/Login";
import { AuthProvider } from './AuthContext';
import AboutPage from "./components/About/About";
import PrivateRoutes  from './utils/PrivateRoutes';
import Profile from "./components/About/Profile"
import EditProfile from './components/Edit/EditProfile';
import UserTofollow from './components/UserTofollow/UserTofollow';



function App() {
 
  
 
  
  return (
  <AuthProvider>
    

 
  <Router>
  <Navbar/>
  <Routes>
  <Route path = "/" element ={<Homepage />}/>
  
  <Route path = "/signIn" element ={<SignIn/>}/>
  <Route path ="/Login" element ={<Login/>}/>
  <Route element = {<PrivateRoutes/>}>
  <Route path ="/About" element ={<AboutPage/>}/>
  <Route path = "/EditProfile" element ={<EditProfile/>}/>
  <Route path ="/SignOut" element ={<SignOut/>}/>
  <Route path="/user/:_id" element={<Profile/>} />
  <Route path = "/userTofollow" element ={<UserTofollow/>}/>
  </Route>
   
  </Routes>
  </Router>
 
  </AuthProvider>
  );
}

export default App;
