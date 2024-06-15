import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="forgot-password" element = {<ForgotPassword/>}/>
            </Routes>
        </div>
    );
}

export default App;
