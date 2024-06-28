import React from 'react'
import ChangeProfilePic from './ChangeProfilePic'
import EditProfile from './EditProfile'
import UpdatePass from './UpdatePass'
import DeleteAccount from './DeleteAccount'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../../utils/constants'

const Settings = () => {
    const {user} = useSelector((state) => state.profile)
    console.log(user);
    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h1>

            <ChangeProfilePic/>
            <EditProfile/>
            <UpdatePass/>
            {user?.accountType != ACCOUNT_TYPE.ADMIN && <DeleteAccount/>}

        
        </>
    )
}

export default Settings