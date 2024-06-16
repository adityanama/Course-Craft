import React from 'react'
import Template from '../components/core/Auth/Template'
import signUpImage from '../assets/Images/signup.webp';

const SignUp = () => {
    return (
        <div>
            <Template
                title={"Join the millions learning to code with StudyNotion for free"}
                description1={"Build skills for today, tomorrow, and beyond."}
                description2={"Education to future-proof your career."}
                image={signUpImage}
                formType={"signup"}
            />
        </div>
    )
}

export default SignUp