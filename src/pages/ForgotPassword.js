import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiArrowBack } from "react-icons/bi"
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handlesumbit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8 mx-auto">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 text-center mb-10">
                            {
                                !emailSent ? "Reset your Password" :
                                    "Check your Email"
                            }
                        </h1>
                        {
                            !emailSent ? (
                                <p className="my-6 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                                    Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
                                </p>
                            ) : (
                                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                                    We've sent an email to <span className='underline'>{email}</span> with instructions to reset your password.  
                                </p>
                            )
                                
                        }


                        <form onSubmit={handlesumbit}>
                            {
                                !emailSent && (
                                    <label className='w-full'>
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                                        <input
                                            type='email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your Email Address'
                                            className="form-style w-full"
                                        />
                                    </label>
                                )
                            }
                            <button type="submit"
                                className="mt-8 w-[40%] rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900 block mx-auto">
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>

                        <div className="mt-8 flex items-center justify-between">
                            <Link to={"/login"}>
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack /> Back to Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword