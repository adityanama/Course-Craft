import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';
import CTAButton from './CTAButtons';
import { FaArrowRight } from 'react-icons/fa';

const InstructorSection = () => {
    return (
        <div className='flex flex-col lg:flex-row items-center gap-20'>
            <div className='lg:w-[50%]'>
                <img src={Instructor} className="shadow-white shadow-[-20px_-20px_0_0]" />
            </div>

            <div className='flex flex-col gap-10 lg:w-[50%]'>
                <div className='text-4xl font-semibold lg:w-[50%]'>
                    Become an
                    <HighlightText text={"instructor"} />
                </div>

                <p className=' text-richblack-300 font-medium text-[16px] text-justify w-[90%]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-3'>
                            Start Teaching Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection