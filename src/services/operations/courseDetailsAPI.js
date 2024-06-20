import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { categories, courseEndpoints } from '../apis'


export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", categories.CATEGORIES_API)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data
    } catch (error) {
        toast.error(error.message);
    }

    return result;
}


export const addCourseDetails = async (formData, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, formData, {
            Authorization: `${token}`
        })
        console.log(response);

        if (!response.data.success)
            throw new Error(response.data.message)

        // toast.success(response.data.message);
        result = response.data.data
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT", courseEndpoints.EDIT_COURSE_API, data, {
            Authorization: `${token}`
        })
        console.log(response);

        if (!response.data.success)
            throw new Error(response.data.message)

        toast.success(response.data.message);
        result = response.data.data

    } catch (error) {
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

export const createCategory = async (name, desc, token) => {
    try {
        const response = await apiConnector("POST", categories.CREATE_CATEGORIES_API, {
            name: name,
            description: desc
        }, {
            Authorization: `${token}`
        })
        console.log(response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success(response.data.message);

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}