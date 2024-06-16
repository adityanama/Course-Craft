import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/authSlice"
import { resetCart } from "../../Slices/cartSlice"
import { setUser } from "../../Slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"


export const sendOTP = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.SENDOTP_API, { email });
            console.log(response.data);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success(response.data.message);
            navigate("/verify-email");

        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error.message);
        }
        dispatch(setLoading(false));
    };
}

export const signup = (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            });

            toast.success(response.data.message);
            navigate("/login");

        } catch (error) {
            toast.error(error?.response?.data?.message);
            console.log(error.message);
            navigate("/signup")
        }
        dispatch(setLoading(false));

    }
}

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.LOGIN_API, { email, password });
            console.log(response.data);

            if (response.data.message === "Invalid password") {
                toast.error("Incorrect password");
                dispatch(setLoading(false));
                return;
            }

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successfull");
            dispatch(setToken(response.data.token));

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName[0]} ${response.data.user.lastName[0]}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token", JSON.stringify(response.data.token));

            navigate("/dashboard/my-profile")

        } catch (error) {
            toast.error(`${error?.response?.data?.message}`);
            console.log(error);
        }
        dispatch(setLoading(false));
    };
}

export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, { email })
            // console.log(response);

            if (!response.data.success) {
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

export const resetPassword = (password, confirmPassword, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, { password, confirmPassword, token });

            // console.log(response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfully");

        } catch (error) {
            console.log(error.message);
            toast.error("Failed to reset password");
        }
        dispatch(setLoading(false));
    }
}


export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }

}