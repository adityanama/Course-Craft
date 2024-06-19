import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RequirementField = ({ name, label, register, setValue, errors }) => {

    const { editCourse } = useSelector((state) => state.course);
    const [requirement, setRequirement] = useState([])
    const [requirementList, setRequirementList] = useState([])

    const handleAdd = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }
    const handleRemove = (index) => {
        const updatedReqList = [...requirementList];
        updatedReqList.splice(index, 1);
        setRequirementList(updatedReqList);
    }

    useEffect(() => {
        register(name, {
            required: true,
            vaildate: (value) => value.length > 0
        })
    }, [])

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>{label}<sup className='text-pink-200'>*</sup></label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full"
                />
                <button type='button' onClick={handleAdd} className="font-semibold text-yellow-50">
                    Add
                </button>
            </div>
            {
                console.log(requirementList)
            }
            {
                requirementList.length > 0 && (
                    <ul className="mt-2 list-inside list-disc">
                        {
                            requirementList.map((req, index) => (
                                <li key={index} className="flex items-center text-richblack-5">
                                    <span>{req}</span>
                                    <button type='button' onClick={()=>handleRemove(index)} className="ml-2 text-xs text-pure-greys-300 ">
                                        Clear
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200"  >
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirementField