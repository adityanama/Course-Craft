import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiUpload } from 'react-icons/fi';
import IconBtn from '../../../common/IconBtn'
import { updateProfilePic } from '../../../../services/operations/SettingsAPI'

const ChangeProfilePic = () => {

    const [loading, setLoading] = useState(false);
    const [ImageFile, SetImageFile] = useState(null);
    const [previewSrc, SetPreviewSrc] = useState(null);

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        console.log(file);
        if (file) {
            SetImageFile(file);
            previewFile(file);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            SetPreviewSrc(reader.result);
        }
    }

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileUpload = () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", ImageFile);
        
            dispatch(updateProfilePic(formData, token)).then(() => {
                setLoading(false);
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (ImageFile) {
            previewFile(ImageFile)
        }
    }, [ImageFile])

    return (
        <div>
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className='flex items-center gap-16'>
                    <img src={previewSrc || user?.image} alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover" />
                    <div className='space-y-4'>
                        <p className="text-lg font-semibold text-richblack-5">Change Profile Picture</p>

                        <div className='flex gap-6'>
                            <input
                                type='file'
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                            >
                                Select
                            </button>
                            <IconBtn
                                text={loading ? "Uploading..." : "Upload"}
                                onclick={handleFileUpload}
                            >
                                {!loading && (
                                    <FiUpload className="text-lg text-richblack-900" />
                                )}
                            </IconBtn>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChangeProfilePic