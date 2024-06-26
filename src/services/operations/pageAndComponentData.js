import React from 'react'
import { apiConnector } from '../apiconnector'
import { catalogData } from '../apis'
import toast from 'react-hot-toast'

export const getCatalogPageData = async (categoryId) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, { categoryId })

        console.log(response);
        if (!response?.data?.success)
            throw new Error(response.data.message);
        result = response.data.data

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result
}
