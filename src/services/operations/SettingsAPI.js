import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints } from '../apis'
import { setUser } from '../../Slices/profileSlice'

export const updateProfilePic = (formData, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `${token}`,
            })

            console.log(response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success(response.data.message);
            dispatch(setUser(response.data.data));

        } catch (error) {
            console.log(error);
            toast.error("Could Not Update Display Picture");
        }
        toast.dismiss(toastId);
    }
}

export const updateProfile = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, formData, {
                Authorization: `${token}`,
            })

            console.log(response.data);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            dispatch(setUser(response.data.updatedUserDetails));
            localStorage.setItem("user", JSON.stringify(response.data.updatedUserDetails));

            toast.success(response.data.message);
        }
        catch (error) {
            console.log(error);
            toast.error("Could not update profile")
        }
        toast.dismiss(toastId);
    }
}