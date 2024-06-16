import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const [showPass, setShowPass] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlechange = (e) => {
        setFormData((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData.email,formData.password, navigate));

    }

    return (
        <form onSubmit={handleSubmit}  className='flex flex-col gap-4 mt-8'>
            <label className='relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                <input
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handlechange}
                    className="form-style w-full !pr-10"
                    placeholder='Enter email address'
                />

            </label>
            <label className='relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password<sup className="text-pink-200">*</sup></p>
                <input
                    required
                    type={showPass ? 'password' : 'text'}
                    name='password'
                    value={formData.password}
                    onChange={handlechange}
                    className="form-style w-full !pr-10"
                    placeholder='Enter Password'
                />
                <span
                    onClick={() => setShowPass((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {showPass ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                <Link to={"/forgot-password"}>
                    <p className="mt-2 ml-auto max-w-max text-sm text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button type='submit' className="mt-3 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                Log In
            </button>
        </form>
    )
}

export default LoginForm