import React, { useEffect, useState } from 'react'
import { createCategory } from '../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'

const CreateCategory = ({ data, setData }) => {

    const { token } = useSelector((state) => state.auth)

    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        if (data) {
            setName(data.name)
            setDesc(data.desc)
        }
    }, [])

    const handleSubmit = async () => {
        console.log(name, desc)
        try {
            await createCategory(name, desc, token)
            setName("")
            setDesc("")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 mt-32 w-[800px] mx-auto relative">
            <div className='flex flex-row space-x-20 items-center'>
                <label htmlFor='name' className="text-md text-richblack-5">Name<sup className='text-pink-200'>*</sup></label>
                <input
                    type='text'
                    id='name'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    value={desc}
                    className="form-style w-[55%]"
                    placeholder='Enter Category Description'
                />
            </div>

            <div className='flex gap-10'>
                <button type="submit" className='bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 block mt-8'>
                    {
                        data ? "Update" : "Add"
                    }
                </button>

                {data && <button type="submit" onClick={() => setData(null)} className='bg-[#d52f34] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 block mt-8'>
                    Cancel
                </button>}
            </div>
        </form>
    )
}

export default CreateCategory