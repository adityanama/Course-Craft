import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../../App.css"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { apiConnector } from '../../../services/apiconnector'
import { ratingsEndpoints } from '../../../services/apis'

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect(() => {
        const fetchAllReviews = async () => {
            const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)

            console.log(response.data.data)
            if (response.data.success)
                setReviews(response.data.data)
        }
        fetchAllReviews();
    }, [])


    return (
        <div className="text-white w-full">
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full "
                >
                    {
                        reviews.map((review, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="flex flex-col gap-3 bg-richblack-800 p-5 text-[17px] text-richblack-25 rounded-md">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review.user.image}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />

                                        <div className='flex flex-col gap-y-1'>
                                            <h1 className="font-semibold text-richblack-5">
                                                {`${review?.user?.firstName} ${review?.user?.lastName}`}
                                            </h1>
                                            <h2 className="text-[13px] font-medium text-richblack-25">
                                                {review.course.courseName}
                                            </h2>
                                        </div>
                                    </div>

                                    <p className='font-medium text-richblack-25 mt-2'>
                                        {review?.review.split(" ").length > truncateWords
                                            ? `${review?.review
                                                .split(" ")
                                                .slice(0, truncateWords)
                                                .join(" ")} ...`
                                            : `${review?.review}`}
                                    </p>

                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />

                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider