import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCourseCategories } from '../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import IconBtn from '../../common/IconBtn';
import { FiEdit2 } from 'react-icons/fi';
import CreateCategory from './CreateCategory';

const Categories = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(null);

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
    }, [])

    return (
        <>
            {!data ? (
                <div>
                    <div className="text-3xl text-richblack-50">Categories</div>


                    <div className="flex flex-wrap gap-8 my-20 items-center">
                        {
                            categories.map((category, index) => (
                                <div key={category.id} className="bg-richblack-600 rounded-md p-4 w-48 h-16
                    shadow-md hover:shadow-lg transition duration-300 ease-in-out flex justify-between">
                                    <p className="text-[22px] text-richblack-5">{category.name}</p>
                                    <button
                                        title="Edit"
                                        className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                        onClick={() => setData({
                                            name : category.name,
                                            desc : category.description
                                        })}
                                    >
                                        <FiEdit2 size={20} />
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    <button onClick={() => navigate("/dashboard/create-category")} className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900'>Add Category</button>


                </div>
            ) : (
                <CreateCategory data = {data} setData = {setData}/>
            )}
        </>
    )
}

export default Categories