import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import { UserActions } from "../../redux/slice/user.slice";
import selector from "../../redux/selector";
import statusConstants from "../../constants/status.constants";
import { Loader, ButtonLoader } from "..";

const validationSchema = Yup.object({
    first_name: Yup.string().required("Firstname is a required field"),
    last_name: Yup.string().required("Lastname is a required field"),
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email"),
});

const Profile = () => {
    const dispatch = useDispatch();

    const [processing, setProcessing] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [profileImageUrl, setProfileImageUrl] = useState("");

    const user = useSelector(selector.user);
    const userStatus = useSelector(selector.userStatus);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const setFormValues = useCallback(() => {
        for (const key in user) {
            setValue(key, user[key]);
        }
    }, [setValue, user]);

    useEffect(() => {
        dispatch(UserActions.getProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user.profile_image) {
            setProfileImageUrl(
                process.env.REACT_APP_API_SERVER_URL + user.profile_image
            );
        }
        if (Object.keys(user).length > 0) {
            setFormValues();
        }
    }, [user, setFormValues]);

    const update = async (payload) => {
        setProcessing(true);
        const formData = new FormData();

        for (const key in payload) {
            formData.append(key, payload[key]);
        }

        if (profileImage)
            formData.append("profile_image", profileImage, profileImage.name);

        const actionResult = await dispatch(
            UserActions.updateProfile(formData)
        );
        setProcessing(false);
        if (!actionResult.hasOwnProperty("error")) {
            dispatch(UserActions.getProfile());
        }
    };

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function (e) {
            setProfileImage(file);
            setProfileImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            {userStatus === statusConstants.PENDING && <Loader />}
            <form
                className="bg-white create-account mb-10"
                onSubmit={handleSubmit(update)}
            >
                <div className="form-content xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 py-10">
                    <div className="flex justify-between mb-10 items-end">
                        <div>
                            <h1 className="hepta-bold font-32 primary-text-color whitespace-nowrap">
                                Edit Profile
                            </h1>
                        </div>
                        <div>
                            <img
                                src="/images/login-vector.png"
                                alt=""
                                title=""
                            />
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    First Name
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter First Name"
                                    {...register("first_name")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.first_name?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Last Name
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Last Name"
                                    {...register("last_name")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.last_name?.message}
                                </span>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Profile Logo
                                </div>
                                <div className="profile-image-upload">
                                    <div className="flex items-center">
                                        <div className="mr-3">
                                            <img
                                                className={
                                                    profileImageUrl
                                                        ? "w-24"
                                                        : "h-14"
                                                }
                                                src={
                                                    profileImageUrl
                                                        ? profileImageUrl
                                                        : "images/profile-dummy.png"
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <div className="upload-image-input">
                                                <input
                                                    disabled={processing}
                                                    type="file"
                                                    id="profile-image"
                                                    onChange={handleImage}
                                                />
                                                <label htmlFor="profile-image">
                                                    Upload
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="input-label calibre-regular mb-4">
                                    Email
                                </div>
                                <input
                                    disabled={processing}
                                    type="text"
                                    className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                    placeholder="Enter Mail"
                                    {...register("email")}
                                />
                                <span className="text-red-500 block mt-2">
                                    {errors.email?.message}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-footer xl:px-32 lg:px-32 md:px-16 sm:px-10 px-4 border-t-2 py-10">
                    <div className="flex items-center justify-start">
                        <Link
                            disabled={processing}
                            type="button"
                            className="disabled:opacity-50 btn-create-account calibre-regular font-16 uppercase primary-text-color mr-3"
                            to="/home/dashboard"
                        >
                            Cancel
                        </Link>
                        <button
                            disabled={processing}
                            type="submit"
                            className="disabled:opacity-50 btn-login calibre-regular font-16 uppercase primary-bg-color text-white"
                        >
                            <span>
                                {processing ? <ButtonLoader /> : "Update"}
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;
