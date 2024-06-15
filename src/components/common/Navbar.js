import React, { useEffect, useState } from 'react'
import Logo from "../../assets/Logo/logo_dark.png";
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux';
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import ProfileDropdown from "../core/Auth/ProfileDropdown"
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';


const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log(result);
            console.log(result.data.message);
            setSubLinks(result.data.allCategories);

        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchSubLinks();
    }, [])

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-richblack-700 '>
            <div className='w-11/12 flex max-w-maxContent justify-between items-center'>
                <Link to={"/"}>
                    <img src={Logo} alt="Logo" width={190} height={64} loading="lazy" />
                </Link>

                <nav>
                    <ul className='flex gap-6 text-richblack-25'>
                        {
                            NavbarLinks.map((element, idx) => (
                                <li key={idx}>
                                    {
                                        element.title === "Catalog" ?
                                            (
                                                <div className='flex items-center gap-2 group relative'>
                                                    <p>{element.title}</p>
                                                    <BsChevronDown />

                                                    <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                        <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'></div>

                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map((subLink, idx) => (
                                                                    <Link key={idx} to={subLink.link}>
                                                                        <p>{subLink.title}</p>
                                                                    </Link>
                                                                ))

                                                            ) : (<div></div>)
                                                        }
                                                    </div>
                                                </div>

                                            ) :
                                            (
                                                <Link to={element.path}>
                                                    <h4 className={`${matchRoute(element?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {element.title}
                                                    </h4>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className='flex gap-4 items-center'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to={"/dashboard/cart"} className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 &&
                                    <span>{totalItems}</span>
                                }
                            </Link>
                        )

                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar