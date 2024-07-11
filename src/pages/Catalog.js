import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import CourseCard from '../components/core/Catalog/CourseCard'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import { setLoading } from '../Slices/profileSlice'


const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    const [catalogPageData, setCatalogPageData] = useState();
    const [categoryId, setCategoryId] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategory = async () => {
            dispatch(setLoading(true))
            const response = await apiConnector("GET", categories.CATEGORIES_API);

            const id = response.data.data.filter((cat) => cat.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id

            setCategoryId(id);
            dispatch(setLoading(false))
        }

        getCategory();
    }, [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const reponse = await getCatalogPageData(categoryId, dispatch)
                setCatalogPageData(reponse)
            }
            catch (error) {
                console.log(error)
            }
        }
        if (categoryId)
            getCategoryDetails();
    }, [categoryId])

    console.log(catalogPageData?.selectedCategory?.courses)
    return (
        <>
            {
                loading ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    catalogPageData ? (
                        <div className='text-3xl text-white flex items-center justify-center flex-1'>
                            <h1>No courses found for the selected category</h1>
                        </div>
                    ) : (
                        <>
                            <div className=" box-content bg-richblack-800 px-4">
                                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                                    <p className="text-sm text-richblack-300">Home / Catalog /
                                        <span className='text-yellow-25'>{catalogName}</span>
                                    </p>
                                    <p className="text-3xl text-richblack-5">{catalogName}</p>
                                    <p className="max-w-[870px] text-richblack-200">{catalogPageData?.selectedCategory.description}</p>
                                </div>
                            </div>


                            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                                <div className="section_heading">Courses to get you started</div>
                                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                                    <p className={`px-4 py-2 ${active === 1
                                        ? "border-b border-b-yellow-25 text-yellow-25"
                                        : "text-richblack-50"
                                        } cursor-pointer`}
                                        onClick={() => setActive(1)}
                                    >
                                        Most Popular
                                    </p>
                                    <p className={`px-4 py-2 ${active === 2
                                        ? "border-b border-b-yellow-25 text-yellow-25"
                                        : "text-richblack-50"
                                        } cursor-pointer`}
                                        onClick={() => setActive(2)}
                                    >
                                        New
                                    </p>
                                </div>
                                <div>
                                    <CourseSlider Courses={catalogPageData?.selectedCategory?.courses} />
                                </div>
                            </div>

                            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                                <p className='section_heading'>Top Courses in {catalogPageData?.differentCategory?.name}</p>
                                <div className='py-8'>
                                    <CourseSlider Courses={catalogPageData?.differentCategory?.courses} />
                                </div>
                            </div>

                            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                                <p className='section_heading'>Frequently Bought Together</p>
                                <div className='py-8'>
                                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                                        {
                                            catalogPageData?.mostSellingCourses.slice(0, 4).map((course, id) => (
                                                <CourseCard course={course} key={id} Height={"h-[400px]"} />
                                            ))
                                        }

                                    </div>

                                </div>
                            </div>
                            <Footer />
                        </>
                    )
                )
            }
        </>
    )
}

export default Catalog