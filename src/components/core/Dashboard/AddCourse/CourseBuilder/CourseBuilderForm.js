import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { setEditCourse, setStep, setCourse } from '../../../../../Slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'

const CourseBuilderForm = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [edit, setEdit] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const cancelEdit = () => {
        setEdit(false);
        setValue("sectionName", "");
    }

    const onSubmit = async (data) => {
        setLoading(true);
        let result;

        if (edit) {
            result = await updateSection({
                sectionName: data.sectionName,
                sectionId: edit,
                courseId: course._id
            }, token)
        }

        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id
            }, token)
        }

        if(result){
            dispatch(setCourse(result));
            setEdit(null);
            setValue("sectionName", "");
        }

        setLoading(false);
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    const goToNext = () => {
        if (course.courseContent.length == 0)
            toast.error("Please add at least one Section")

        if (course.courseContent.some((section) => section.subSection.lenght === 0))
            toast.error("Please add at least one Lecture in each Section")

        dispatch(setStep(3));
    }

    const handleChangeEdit = (sectionId, sectionName) => {

        if(edit == sectionId){
            cancelEdit(null)
            return;
        }

        setEdit(sectionId);
        setValue("sectionName", sectionName);  
    }

    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">Section Name<sup className='text-pink-200'>*</sup></label>
                    <input
                        id='sectionName'
                        disabled={loading}
                        placeholder="Add a section to build your course"
                        {...register("sectionName", { required: true })}
                        className='form-style w-full'
                    />
                    {
                        errors.sectionName && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Section Name is required</span>
                        )
                    }
                </div>

                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type={"submit"}
                        disabled={loading}
                        text={edit ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {
                        edit && (
                            <button type='button' onClick={cancelEdit} className="text-sm text-richblack-300 underline">Cancel Edit</button>
                        )
                    }
                </div>
            </form>
            {
                console.log(course)
            }
            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeEdit = {handleChangeEdit}/>
                )   
            }

            <div className='flex justify-end gap-3'>
                <button onClick={goBack} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>Back</button>
                <IconBtn text={"Next"} onClick={goToNext} disabled={loading}></IconBtn>
            </div>

        </div>
    )
}

export default CourseBuilderForm