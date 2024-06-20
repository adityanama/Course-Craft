import React, { useState } from 'react'
import { createCategory } from '../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'

const CreateCategory = () => {

    const {token} = useSelector((state) => state.auth)

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    const handleSubmit = async() => {
        console.log(name,desc)
        try {
            await createCategory(name,desc,token)
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>
            <form className="space-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 mt-32 w-[800px] mx-auto">
            <div className='flex flex-row space-x-20 items-center'>
                <label htmlFor='name' className="text-md text-richblack-5">Name<sup className='text-pink-200'>*</sup></label>
                <input
                    type='text'
                    id='name'
                    onChange={(e) => setName(e.target.value)}
                    className="form-style w-[35%]"
                    placeholder='Enter Category Name'
                />
            </div>
            <div className='flex flex-row space-x-10 items-start'>
                <label htmlFor='desc' className="text-md text-richblack-5">Description<sup className='text-pink-200'>*</sup></label>
                <input
                    type='text'
                    id='desc'
                    onChange={(e) => setDesc(e.target.value)}
                    className="form-style w-[55%]"
                    placeholder='Enter Category Description'
                />
            </div>

        </form>

        <button onClick={handleSubmit} className='bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 block ml-24 mt-6'>Add Category</button>
        </>

    )
}

export default CreateCategory