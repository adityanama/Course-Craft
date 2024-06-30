import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/CTAButtons"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ReviewSlider from '../components/core/HomePage/ReviewSlider'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
    return (
        <div >
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8'>

                <Link to={"/signup"}>
                    <div className='mt-16 p-1 rounded-full mx-auto bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                        <div className='flex gap-2 items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold'>
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"} />
                </div>

                <div className='-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-8 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                </div>

                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video
                        className="shadow-[20px_20px_rgba(255,255,255)]"
                        muted
                        loop
                        autoPlay>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighlightText text={"Coding potential "} />
                                with our online courses
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/signup",
                                active: false,
                            }
                        }
                        codeColor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        bgGrad={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighlightText text={"Coding in seconds"} />
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/signup",
                                active: false,
                            }
                        }
                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        bgGrad={<div className="codeblock2 absolute"></div>}
                    />
                </div>

                <ExploreMore/>
            </div>

            <div className=' bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[320px]'>
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8 mx-auto'>
                        <div className='lg:h-[150px]'></div>
                        <div className='flex gap-7 text-white lg:mt-8'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-4'>
                                    Explore full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div className='flex items-center gap-4'>
                                    Learn More
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8'>
                    <div className="mb-10 flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className='text-4xl font-semibold lg:w-[45%]'>
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand."} />
                        </div>
                        <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                            <p className='text-[16px]'>
                                The modern CourseCraft is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </p>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>

                    <TimelineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            <div className='bg-richblack-900 w-11/12 mx-auto flex flex-col max-w-maxContent justify-between gap-8 items-center relative my-20 text-white'>
                <InstructorSection/>

                <h2 className='text-center text-4xl font-semibold mt-10 text-white'>Review from other Learners</h2>
                <ReviewSlider/>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Home