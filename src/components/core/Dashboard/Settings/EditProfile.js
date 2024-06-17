import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { genders } from '../../../../utils/constants';
import IconBtn from '../../../common/IconBtn';
import { updateProfile } from '../../../../services/operations/SettingsAPI';

const EditProfile = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitProfileForm = async(data) => {
        try {
            dispatch(updateProfile(token,data));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitProfileForm)}>
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                <h1 className="text-xl font-semibold text-richblack-5">Personal Information</h1>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstName" className="lable-style">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter first name"
                            className="form-style"
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName}
                        />
                        {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your first name.
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastName" className="lable-style">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter first name"
                            className="form-style"
                            {...register("lastName", { required: true })}
                            defaultValue={user?.lastName}
                        />
                        {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="dateOfBirth" className="lable-style">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="Enter your DOB"
                            className="form-style"
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date of Birth.",
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future.",
                                },
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {errors.dateOfBirth && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="gender" className="lable-style">
                            Gender
                        </label>
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            className="form-style"
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            {
                                genders.map((gender, index) => (
                                    <option key={index} value={gender}>
                                        {gender}
                                    </option>

                                ))
                            }
                        </select>
                        {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className="lable-style">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Enter Contact Number"
                            className="form-style"
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.contactNumber.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="about" className="lable-style">
                            About
                        </label>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder="Enter Bio Details"
                            className="form-style"
                            {...register("about", { required: true })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your About.
                            </span>
                        )}
                    </div>
                </div>

                <div className="">
                    <IconBtn type="submit" text="Save" />
                </div>
            </div >
        </form>
    )
}

export default EditProfile