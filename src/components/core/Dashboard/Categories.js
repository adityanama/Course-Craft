import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourseCategories } from '../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import IconBtn from '../../common/IconBtn';

const Categories = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetchCourseCategories();
                setCategories(response);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }

        getCategories();
    }, [categories])



    return (
        <div>
            <div className="text-3xl text-richblack-50">Categories</div>
            

            <div className="flex flex-wrap gap-8 my-20 items-center">
                {
                    categories.map((category, index) => (
                        <div key={category.id} className="bg-richblack-800 rounded-md p-4 w-48 h-16
                    shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                            <p className="text-[22px] text-richblack-5">{category.name}</p>
                        </div>
                    ))
                }
            </div>

            <button onClick={() => navigate("/dashboard/create-category")} className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'>Add Category</button>


        </div>
    )
}

export default Categories