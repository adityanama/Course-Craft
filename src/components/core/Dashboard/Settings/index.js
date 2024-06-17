import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'
import UpdatePass from './UpdatePass'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>

            <ChangeProfilePic/>
            <EditProfile/>
            <UpdatePass/>
            <DeleteAccount/>
        
        </>
    )
}

export default Settings