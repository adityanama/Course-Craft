import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        cnfPassword: "",
    })
    
    const [showPass, setShowPass] = useState(true);
    const [showCnfPass, setShowCnfPass] = useState(true);
    const { loading } = useSelector((state) => state.auth);

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
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(formData.password, formData.cnfPassword, token));
        navigate("/login");
    }

    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Create new Password</h1>
                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and you are all set.</p>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <label className='relative'>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
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
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                >
                                    {showPass ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>

                            </label>
                            <label className='relative'>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password<sup className="text-pink-200">*</sup></p>
                                <input
                                    required
                                    type={showCnfPass ? 'password' : 'text'}
                                    name='cnfPassword'
                                    value={formData.cnfPassword}
                                    onChange={handlechange}
                                    className="form-style w-full !pr-10"
                                    placeholder='Confirm Password'
                                />
                                <span
                                    onClick={() => setShowCnfPass((prev) => !prev)}
                                    className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                    {showCnfPass ? (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>

                            <button type='submit' className="mt-3 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                            </button>
                        </form>
                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack /> Back To Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword