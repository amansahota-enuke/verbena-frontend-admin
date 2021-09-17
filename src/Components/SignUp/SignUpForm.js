import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UserActions } from "../../redux/slice/user.slice";
import { ButtonLoader } from "..";

const SignUpForm = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [loader, setLoader] = useState(true);
    const [processing, setProcessing] = useState(false);

    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Firstname is a required field"),
        last_name: Yup.string().required("Lastname is a required field"),
        email: Yup.string()
            .required("Email is a required field")
            .email("Invalid email"),
        password: Yup.string().required("Password is a required field"),
        confirmPassword: Yup.string()
            .required("Passsword is a required field")
            .oneOf([Yup.ref("password"), null], "Password must match"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        resolver: yupResolver(validationSchema),
    });

    const signUp = async (payload) => {
        setProcessing(true);
        const formData = new FormData(); // Currently empty

        for (const key in payload) {
            formData.append(key, payload[key]);
        }

        if (image) formData.append("profile_image", image, image.name);

        const actionResult = await dispatch(UserActions.signUp(formData));
        if (!actionResult.hasOwnProperty("error")) {
            history.push("/home/dashboard");
        }
    };

    const handleImage = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onloadend = function (e) {
            setImage(file);
            setImageUrl(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            <div className="">
                <div className="bg-white create-account mb-10">
                    <form onSubmit={handleSubmit(signUp)}>
                        <div className="form-content xl:px-32 lg:px-32 md:px-10 sm:px-5 px-4 py-10">
                            <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap sm:flex-wrap flex-wrap justify-between items-end mb-16">
                                <div>
                                    <h1 className="hepta-bold primary-text-color lh-40">
                                        Create An Account
                                    </h1>
                                </div>
                                <div>
                                    <img
                                        src="images/login-vector.png"
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
                                            Profile Image
                                        </div>
                                        <div className="profile-image-upload">
                                            <div className="flex items-center">
                                                <div className="mr-3">
                                                    <img
                                                        className={
                                                            imageUrl
                                                                ? "w-24"
                                                                : "h-14"
                                                        }
                                                        src={
                                                            imageUrl
                                                                ? imageUrl
                                                                : "images/profile-dummy.png"
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <div className="upload-image-input">
                                                        <input
                                                            disabled={
                                                                processing
                                                            }
                                                            type="file"
                                                            id="profile-image"
                                                            onChange={
                                                                handleImage
                                                            }
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

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Password
                                        </div>
                                        <input
                                            disabled={processing}
                                            type="password"
                                            className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                            placeholder="Enter Password"
                                            {...register("password")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.password?.message}
                                        </span>
                                    </div>

                                    <div className="col-span-6">
                                        <div className="input-label calibre-regular mb-4">
                                            Confirm Password
                                        </div>
                                        <input
                                            disabled={processing}
                                            type="password"
                                            className="disabled:opacity-50 custom-input ca-width input-border-color border"
                                            placeholder="Enter Confrim Password"
                                            {...register("confirmPassword")}
                                        />
                                        <span className="text-red-500 block mt-2">
                                            {errors.confirmPassword?.message}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer xl:px-32 lg:px-32 md:px-10 sm:px-5 px-4 border-t-2 xl:py-10 lg:py-10 md:py-4 sm:py-4 py-4">
                            <div className="flex items-center justify-end">
                                <button
                                    disabled={processing}
                                    type="button"
                                    className="disabled:opacity-50 btn-create-account calibre-bold font-18 uppercase primary-text-color mr-3"
                                    onClick={() => history.goBack()}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={processing}
                                    type="submit"
                                    className="disabled:opacity-50 btn-login calibre-bold font-18 uppercase primary-bg-color text-white"
                                >
                                    <span>
                                        {processing ? (
                                            <ButtonLoader />
                                        ) : (
                                            "Register"
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
