import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import getAvgRating from '../utils/getAvgRating'
import ConfirmationModal from '../components/core/Dashboard/ConfirmationModal'
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../utils/formatDate'
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard'
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar'

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
    const [confModal, setConfModal] = useState(null)
    const [isActive, setIsActive] = useState([])

    useEffect(() => {
        const getCourseDetails = async () => {
            try {
                const res = await fetchCourseDetails(courseId)
                setCourseData(res);
            } catch (error) {
                console.log(error)
            }
        }
        getCourseDetails()
    }, [courseId])

    useEffect(() => {
        if (courseData) {
            setAvgReviewCount(getAvgRating(courseData?.data?.courseDetails?.ratingAndReviews))
        }
    }, [courseData])

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec?.subSection?.length || 0;
        })
        setTotalNoOfLectures(lectures)
    }, [courseData])


    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ?
                isActive.concat(id) :
                isActive.filter((item) => item !== id)
        )
    }

    const handleBuyCourse = () => {
        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return
        }

        setConfModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfModal(null),
        })

    }

    if (!courseData?.success) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails

    return (
        <>
            {
                (loading || paymentLoading) ? (
                    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className={`relative w-full bg-richblack-800`}>
                        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
                            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
                                <div className="relative block max-h-[30rem] lg:hidden">
                                    <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                                    <img
                                        src={thumbnail}
                                        alt="course thumbnail"
                                        className="aspect-auto w-full"
                                    />
                                </div>
                                <div
                                    className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
                                >
                                    <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseName}</p>
                                    <p className={`text-richblack-200`}>{courseDescription}</p>
                                    <div className="text-md flex flex-wrap items-center gap-2">
                                        <span className="text-yellow-25">{avgReviewCount}</span>
                                        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                        <span>{`(${ratingAndReviews.length} reviews)`}</span>
                                        <span>{`${studentsEnrolled.length} students enrolled`}</span>
                                    </div>

                                    <div>
                                        <p>Created by {`${instructor.firstName} ${instructor.lastName}`}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-5 text-lg">
                                        <p className="flex items-center gap-2">{" "}
                                            <BiInfoCircle />Created at {formatDate(createdAt)}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            {" "}
                                            <HiOutlineGlobeAlt /> {" "}English
                                        </p>
                                    </div>
                                </div>

                                <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                                    <CourseDetailsCard course={courseData?.data?.courseDetails} setConfModal={setConfModal} handleBuyCourse={handleBuyCourse} />
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
                            <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                                <div className="my-8 border border-richblack-600 p-8">
                                    <p className="text-3xl font-semibold">What You Will learn</p>
                                    <div className="mt-5">
                                        {whatYouWillLearn}
                                    </div>
                                </div>

                                <div className="max-w-[830px] ">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-[28px] font-semibold">Course Content</p>
                                        <div className="flex flex-wrap justify-between gap-2">
                                            <div className="flex gap-8">
                                                <span>{courseContent.length} section(s)</span>
                                                <span>{totalNoOfLectures} lectures</span>
                                                <span>{courseData.data.totalDuration} total length</span>
                                            </div>

                                            <div>
                                                <button
                                                    className='text-yellow-25'
                                                    onClick={() => setIsActive([])}
                                                >
                                                    Collapse all sections
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='py-4'>
                                        {courseContent.map((section, index) => (
                                            <CourseAccordionBar
                                                section={section}
                                                key={index}
                                                isActive={isActive}
                                                handleActive={handleActive}
                                            />
                                        ))}
                                    </div>

                                    <div className="mb-12 py-4">
                                        <p className="text-[28px] font-semibold">Author</p>
                                        <div className="flex items-center gap-4 py-4">
                                            <img
                                                src={
                                                    instructor.image
                                                        ? instructor.image
                                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                                }
                                                alt="Author"
                                                className="h-14 w-14 rounded-full object-cover"
                                            />
                                            <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                                        </div>
                                        <p className="text-richblack-50">
                                            {instructor?.additionalDetails?.about}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {confModal && <ConfirmationModal modalData={confModal} />}
        </>
    )
}

export default CourseDetails