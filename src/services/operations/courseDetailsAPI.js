import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { categories, courseEndpoints, endpoints } from '../apis'


export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", categories.CATEGORIES_API)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log(response);

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
        const response = await apiConnector("POST", courseEndpoints.COURSE_DETAILS_API, { courseId })
        console.log(response);

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data
    } catch (error) {
        console.log(error.respone);
    }
    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", courseEndpoints.EDIT_COURSE_API, data, {
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

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", courseEndpoints.DELETE_COURSE_API, data, {
            Authorization: `${token}`
        })

        console.log(response)
        if (!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Deleted")
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
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
        toast.error(error.respone.data.message);
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

export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET", courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `${token}`
        })

        console.log(response);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error("Failed to fetch Courses")
    }

    toast.dismiss(toastId)
    return result
}

export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
            Authorization: `${token}`,
        })

        console.log(response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data

    } catch (error) {
        console.log(error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

export const createRating = async (formData, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", courseEndpoints.CREATE_RATING_API, formData, {
            Authorization: `${token}`
        })
        console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Rating Created")
        success = true

    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return success
}

export const markLectureAsComplete = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const respone = await apiConnector("POST", courseEndpoints.LECTURE_COMPLETION_API, data, {
            Authorization: `${token}`
        })
        console.log(respone)
        if (!respone.data.success) {
            throw new Error(respone.data.message)
        }
        toast.success("Lecture Completed")
        result = true
    } catch (error) {
        console.log(error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}