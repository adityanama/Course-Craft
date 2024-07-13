import toast from "react-hot-toast"
import { setLoading, setUser } from "../../Slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";


export const getUserDetails = (token, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API, null, {
                Authorization: `${token}`,
            })

            console.log(response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.userDetails));
        } catch (error) {
            dispatch(logout(navigate))
            console.log(error)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export const getUserEnrolledCourses = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_USER_ENROLLED_COURSES_API, null,
            {
                Authorization: `${token}`
            }
        )

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {
        console.log(error)
        toast.error("Could Not Get Enrolled Courses");
    }
    toast.dismiss(toastId)
    return result
}

export const getInstructorData = async (token) => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_INSTRUCTOR_DATA_API, null, {
            Authorization: `${token}`
        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        result = response.data.courses;
    } catch (error) {
        console.log(error)
        toast.error("Could Not Get Instructor Data");
    }
    toast.dismiss(toastId)
    return result

}