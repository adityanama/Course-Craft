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
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import { getUserDetails } from "./services/operations/profileAPI";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import {ACCOUNT_TYPE} from './utils/constants'
import AddCourse from "./components/core/Dashboard/AddCourse";
import Categories from "./components/core/Dashboard/Categories";
import CreateCategory from "./components/core/Dashboard/CreateCategory";


const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        if(localStorage.getItem("token")){
            const token = JSON.parse(localStorage.getItem("token"));
            dispatch(getUserDetails(token,navigate));
        }
    }, [])

    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="update-password/:token" element={<UpdatePassword />} />
                <Route path="verify-email" element={<VerifyEmail />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />

                <Route
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                >
                    <Route path="dashboard/my-profile" element={<MyProfile />} />
                    <Route path="dashboard/settings" element={<Settings />} />
                    
                    {
                        user?.accountType == ACCOUNT_TYPE.STUDENT && 
                        <>
                            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                            <Route path="dashboard/cart" element = {<Cart/>} />
                        </>
                    }
                    {
                        user?.accountType == ACCOUNT_TYPE.INSTRUCTOR && 
                        <>
                            <Route path="dashboard/add-course" element={<AddCourse/>} />
                        </>
                    }
                    {
                        user?.accountType == ACCOUNT_TYPE.ADMIN && 
                        <>
                            <Route path="dashboard/category" element={<Categories/>} />
                            <Route path="dashboard/create-category" element={<CreateCategory/>} />
                        </>
                    }
                </Route>
            </Routes>
        </div>
    );
}

export default App;
