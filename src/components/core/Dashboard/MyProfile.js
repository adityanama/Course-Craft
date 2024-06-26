import React from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn'

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    console.log(user);
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                My Profile
            </h1>

            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className='flex items-center gap-4'>
                    <img src={user?.image} alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover" />
                    <div className='space-y-1'>
                        <p className="text-lg font-semibold text-richblack-5"> {user?.firstName + " " + user?.lastName}</p>
                        <p className="text-sm text-richblack-300">{user?.email}</p>
                    </div>
                </div>
                <IconBtn text={"Edit"}
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">About</p>
                    <IconBtn text={"Edit"}
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <p className={`${user?.additionalDetails?.about
                    ? "text-richblack-5"
                    : "text-richblack-400"
                    } text-sm font-medium`}>

                    {user?.additionalDetails?.about ?? "Write Something about Yourself"}
                </p>
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
                    <IconBtn text={"Edit"}
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </IconBtn>
                </div>

                <div className="flex max-w-[500px] justify-between">
                    <div className="flex flex-col gap-y-5" >
                        <div>
                            <p className="mb-2 text-sm text-richblack-400">First Name</p>
                            <p className="text-md font-medium text-richblack-5">{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-400">Email</p>
                            <p className="text-md font-medium text-richblack-5">{user?.email}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-400">Gender</p>
                            <p className="text-md font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Set Gender"}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <p className="mb-2 text-sm text-richblack-400">Last Name</p>
                            <p className="text-md font-medium text-richblack-5">{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-400">Contact Number</p>
                            <p className="text-md font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-400">Date of Birth</p>
                            <p className="text-md font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default MyProfile