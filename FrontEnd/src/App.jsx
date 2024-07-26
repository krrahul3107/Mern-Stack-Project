import React, {useContext, useEffect} from 'react'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { Context } from './main';
import axios from 'axios';
import Footer from "./components/Footer";


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
  useContext(Context);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "https://mern-stack-project-backend-g1wy.onrender.com/api/v1/user/patient/me",
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser(response.data.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser({});
    }
  };
  fetchUser();
}, [isAuthenticated]);


  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/appointment' element = {<Appointment/>}/>
        <Route path = '/about' element = {<AboutUs/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
      <ToastContainer position='top-center'/>
      <Footer />
    </Router>
    </>
  );
};

export default App
