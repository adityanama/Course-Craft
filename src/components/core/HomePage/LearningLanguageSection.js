import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from './CTAButtons';

const LearningLanguageSection = () => {
    return (
        <div>
            <div className='text-4xl font-semibold text-center my-10'>
                Your Swiss Knife for
                <HighlightText text={"learning any language"} />

                <p className='text-center text-richblack-700 mx-auto text-base font-medium lg:w-[75%] leading-6 mt-3'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>

                <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0 '>
                    <img src={Know_your_progress} className='lg:-mr-32 object-contain' />
                    <img src={Compare_with_others} className=' object-contain lg:-mb-10 lg:-mt-0 -mt-12' />
                    <img src={Plan_your_lessons} className='lg:-ml-36 object-contain lg:-mt-5 -mt-16' />
                </div>
            </div>

            <div className='w-fit mx-auto lg:mb-20 mb-8 -mt-5'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
            </div>
        </div >

    )
}

export default LearningLanguageSection