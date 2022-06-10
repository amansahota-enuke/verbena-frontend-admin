import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { UserActions } from "../../redux/slice/user.slice";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is a required Field")
    .email("Invalid email"),
  password: Yup.string().required("Password is a required Field"),
});

const LoginForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, showPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const login = async (payload) => {
    const actionResult = await dispatch(UserActions.login(payload));
    if (!actionResult.hasOwnProperty("error")) {
      history.push("/home");
    }
  };

  const handleShowPassword = () => {
    if (password === false) {
      showPassword(true);
    } else {
      showPassword(false);
    }
  };

  return (
    <>
      <div className="bg-white p-10 login-box px-5 xl:px-8 lg:px-8 md:px-3 sm:px-3 py-10 mb-10">
        <div className="flex xl:flex-nowrap lg:flex-nowrap md:flex-wrap justify-between mb-10 items-end">
          <div>
            <h1 className="hepta-bold primary-text-color login-heading">
              Administrator Log In
            </h1>
          </div>
          <div>
            <img src="images/login-vector.png" alt="" title="" />
          </div>
        </div>

        <form onSubmit={handleSubmit(login)}>
          <div className="flex flex-wrap items-center mb-5">
            <div className="input-label calibre-regular">Email</div>
            <div className="flex-1">
              <input
                type="text"
                className="custom-input input-border-color border"
                placeholder="Email Address"
                {...register("email")}
              />
              <span className="text-red-500 block mt-2">
                {errors.email?.message}
              </span>
            </div>
          </div>

          <div className="flex items-center mb-10">
            <div className="input-label calibre-regular">Password</div>
            <div className="flex-1 relative">
              <input
                type={password ? "text" : "password"}
                className="custom-input input-border-color border"
                placeholder="Password"
                {...register("password")}
              />
              <span className="text-red-500 block mt-2">
                {errors.password?.message}
              </span>
              <span
                className="cursor-pointer eye absolute right-2 top-4"
                onClick={handleShowPassword}
              >
                <i className={password ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>

          <div className="d-flex items-center mb-5">
            <button
              type="submit"
              className="btn-login calibre-regular font-16 uppercase primary-bg-color text-white mr-3"
            >
              Login
            </button>

            {/* <button
              type="button"
              className="btn-create-account calibre-regular font-16 uppercase primary-text-color"
              onClick={() => history.push("/signup")}
            >
              Create Account
            </button> */}
          </div>

          <div className="d-flex items-center mb-20">
            <Link to="/forgot-password" className="light-gray-color">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginForm;
