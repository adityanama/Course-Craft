import React, { useState } from 'react'
import {logout} from '../../../services/operations/authAPI'
import {sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from './ConfirmationModal'
import { VscSignOut } from 'react-icons/vsc'

const Sidebar = () => {
    const { loading: profileLoading, user } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (authLoading || profileLoading) {
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
    }
    return (
        <>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && user?.accountType !== link.type)
                                return null;

                            return (
                                <SideBarLink link={link} key={link.id} />
                            )
                        })
                    }
                </div>

                <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />

                <div className='flex flex-col'>
                    <SideBarLink
                        link={{ name: "Settings", path: "dashboard/settings", icon: "VscSettingsGear" }}
                    />

                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you sure?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData = {confirmationModal}/>}
        </>
    )
}

export default Sidebar