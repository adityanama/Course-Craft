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

export const fetchCourseDetails = async (courseId) => {
    let result = []
    try {
        const response = await apiConnector("GET", courseEndpoints.COURSE_DETAILS_API, { courseId })
        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch (error) {
        console.log(error.respone);
    }
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

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, data, {
            Authorization: `${token}`
        })

        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success(response.data.message)
        result = response.data.updatedCourse

    } catch (error) {
        console.log(error)
        toast.error("Could not Create Section")
    }

    toast.dismiss(toastId)
    return result
}

export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.UPDATE_SECTION_API, data, {
            Authorization: `${token}`
        })
        
        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        
        toast.success(response.data.message);
        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error("Could not Update Section")
    }

    toast.dismiss(toastId)
    return result
}

export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.DELETE_SECTION_API, data, {
            Authorization: `${token}`
        })
        
        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        
        toast.success(response.data.message);
        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error("Failed to Delete Section")
    }

    toast.dismiss(toastId)
    return result
}

export const createSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_SUBSECTION_API, data, {
            Authorization: `${token}`
        })

        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success(response.data.message)
        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error("Failed to Create")
    }

    toast.dismiss(toastId)
    return result
}

export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.UPDATE_SUBSECTION_API, data, {
            Authorization: `${token}`
        })
        
        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        
        toast.success(response.data.message);
        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error("Failed to update")
    }

    toast.dismiss(toastId)
    return result
}

export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.DELETE_SUBSECTION_API, data, {
            Authorization: `${token}`
        })
        
        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        
        toast.success("Lecture Deleted Successfully");
        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error("Failed to delete")
    }

    toast.dismiss(toastId)
    return result
}

