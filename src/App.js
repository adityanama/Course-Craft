import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from './pages/VerifyEmail'
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./pages/SignUp";


function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile);

    // useEffect(() => {
    //     if(localStorage.getItem("token")){
    //         const token = JSON.parse(localStorage.getItem("token"));
    //         dispatch(getUserDetails(token,navigate));
    //     }
    // })

    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="forgot-password" element = {<ForgotPassword/>}/>
                <Route path="update-password/:token" element = {<UpdatePassword/>}/>
                <Route path="verify-email" element = {<VerifyEmail/>}/>
                <Route path="login" element = {<Login/>}/>
                <Route path="signup" element = {<SignUp/>}/>
            </Routes>
        </div>
    );
}

export default App;
