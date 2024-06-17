import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import {AiOutlineShoppingCart} from "react-icons/ai"

const SideBarLink = ({ link }) => {

    const Icon = Icons[link.icon];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink
            to={link.path}
            // onClick={ }
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)
                ? "bg-yellow-800 text-yellow-50"
                : "bg-opacity-0 text-richblack-300"
                } transition-all duration-200`}>

            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                }`}></span>
            <div className='flex gap-2'>
                {
                    link.icon ? (<Icon className = 'text-lg'/>) :  (<AiOutlineShoppingCart className='text-lg'/>)
                }
                <span className='text-[17px]'>{link.name}</span>
            </div>

        </NavLink>
    )
}

export default SideBarLink