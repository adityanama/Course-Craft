import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination, Autoplay } from "swiper/modules"
import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
    console.log(Courses);
    return (
        <>
            {
                Courses?.length ? (
                    <Swiper
                        slidesPerView={0}
                        spaceBetween={25}
                        loop = {true}
                        pagination = {true}
                        modules={[Autoplay,FreeMode,Pagination]}
                        autoplay = {{
                            delay: 1000,
                            disableOnInteraction : false,
                        }}
                        breakpoints = {{
                            1024 : {
                                slidesPerView : 2,
                            }
                        }}
                        className='max-h-[30rem]'
                    >
                        {
                            Courses.map((course,i) => (
                                <SwiperSlide key={i}>
                                    <CourseCard course={course} Height={"h-[250px]"}/>
                                </SwiperSlide>
                            ))
                        }
                        
                    </Swiper>
                ) : (
                    <p className="text-xl text-richblack-5"> No Courses Found</p>
                )
            }
        </>
    )
}

export default CourseSlider