import toast from "react-hot-toast"
import { apiConnector } from '../apiconnector'
import { studentEndpoints } from '../apis'
import Logo from "../../assets/Logo/logo_dark.png";
import { setPaymentLoading } from "../../Slices/courseSlice";
import { resetCart } from "../../Slices/cartSlice";


const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export const buyCourse = async (token, courses, user_details, navigate, dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if (!res) {
            toast.error("Failed to load Razorpay SDK")
            return
        }

        const orderResponse = await apiConnector("POST", studentEndpoints.COURSE_PAYMENT_API, { courses }, {
            Authorization: `${token}`
        })

        console.log(orderResponse)

        if (!orderResponse.data.success)
            throw new Error(orderResponse.data.message)

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "CourseCraft",
            description: "Thank you for Purchasing the Course.",
            image: Logo,
            prefill: {
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email,
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token)
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment Failed.")
            console.log(response.error)
        })
    }

    catch (error) {
        console.log(error)
        toast.error("Payment Failed")
    }
    toast.dismiss(toastId)
}

const sendPaymentSuccessEmail = async (response, amount, token) => {
    try {
        console.log(response.razorpay_payment_id)
        await apiConnector("POST", studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {
            Authorization: `${token}`
        })
    } catch (error) {
        console.log(error)

    }
}

const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", studentEndpoints.COURSE_VERIFY_API, bodyData, {
            Authorization: `${token}`
        })
        console.log(response)

        if (!response.data.success)
            throw new Error(response.data.message)

        toast.success("Payment Successfull")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart());
    }
    catch (error) {
        console.log(error)
        toast.error("Payment Failed")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}