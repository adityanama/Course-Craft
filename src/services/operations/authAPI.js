import toast from "react-hot-toast";
import {setLoading, setToken} from "../../Slices/authSlice"
import { apiConnector } from "../apiconnector";
import {endpoints} from "../apis"

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST",endpoints.RESETPASSTOKEN_API, {email} )
            console.log(response); 

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent Successfully");
            setEmailSent(true);
            
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to sent email");
        }

        dispatch(setLoading(false));
    }
}