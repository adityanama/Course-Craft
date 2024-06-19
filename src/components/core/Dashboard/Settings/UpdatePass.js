import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { changePassword } from '../../../../services/operations/SettingsAPI';

const UpdatePass = () => {

    const { token } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(true)
    const [showNewPassword, setShowNewPassword] = useState(true)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const submitPasswordForm = async (data) => {
        try {
            await changePassword(data, token)
            reset({
                oldPassword: '',
                newPassword: ''
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <h1 className="text-xl font-semibold text-richblack-5">Password</h1>

                <div className="flex flex-col gap-16 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[40%] relative">
                        <label htmlFor="password" className="lable-style">
                            Current Password
                        </label>
                        <input
                            type={!showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter current password"
                            className="form-style"
                            {...register("oldPassword", { required: true })}

                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.password && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                This field is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[40%] relative">
                        <label htmlFor="lastName" className="lable-style">
                            New Password
                        </label>
                        <input
                            type={!showNewPassword ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter new password"
                            className="form-style"
                            {...register("newPassword", { required: true })}

                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.cnfPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>
                <div className="">
                    <IconBtn type="submit" text="Update" />
                </div>
            </div>
        </form>
    )
}

export default UpdatePass