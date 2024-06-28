import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getAvgRating from '../../../utils/getAvgRating'
import RatingStars from '../../common/RatingStars';

const CourseCard = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = getAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count)
    }, [course])

    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div>
                    <div className='rounded-lg'>
                        <img src={course.thumbnail} alt='Course Image' className={`${Height} w-full rounded-xl object-cover `} />
                    </div>
                    <div className="flex flex-col gap-2 px-1 py-3">
                        <p className="text-xl text-richblack-5">{course.courseName}</p>
                        <p className="text-md text-richblack-50">By {course.instructor.firstName} {course.instructor.lastName}</p>
                        <div>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span className='text-richblack-400'>{course.ratingAndReviews.length} Ratings</span>
                        </div>  
                        <p className='text-xl text-caribbeangreen-200'>{course.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard