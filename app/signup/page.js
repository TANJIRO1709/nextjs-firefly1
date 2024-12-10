'use client';
import React, { useEffect, useState } from "react";
import { long_logo, ClosedEye, Google, OpenEye } from "../assets/icons";
import home_login from "../assets/images/house_login.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import page_break from "../assets/images/page_break.png";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "../context/userContext";
import redirectIfLoggedIn from "../util/middleware"
const SignUp = () => {
  const [view, setView] = useState("password");
  const userContext = useContext(UserContext);
  const { signup, googleSignin } = userContext;

  const SignupValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long")
      .required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().length(10).required("Required"),
    agreeToTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#cfdfe0";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  useEffect(() => {
    // Define the CSS as a string
    const scrollbarStyles = `
      ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #cfdfe0;
      border-radius: 10px;
    }

    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #cfdfe0;
    }
    `;

    // Create a style element
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = scrollbarStyles;
    document.head.appendChild(styleSheet);

    return () => {
      // Remove the style element on cleanup
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="h-[100vh] content-center">
      <div className="lg:w-4/12 pt-10 mx-24 pb-24 lg:mx-52 h-[100vh] overflow-y-auto overflow-x-hidden">
        <div className="flex justify-center">{long_logo}</div>
        <div className="text-center text-primary-black text-3xl font-extrabold mt-7">
          Create Account
        </div>

        <Formik
          initialValues={{
            name: "",
            password: "",
            email: "",
            phone: "",
            agreeToTerms: false,
          }}
          validationSchema={SignupValidationSchema}
          onSubmit={(values) => {
            console.log("signup values => ", values);
            signup(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 ">
              <Field
                className="w-full h-11 text-black text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
              />
              <span className="text-red-400 ml-3 text-sm border border-[#cfdfe0]">
                {errors.name && touched.name ? errors.name : ""}
              </span>

              <Field
                className="w-full h-11 text-md rounded-md text-black bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                type="text"
                name="email"
                id="signup_emil"
                placeholder="Enter your email"
              />
              <span className="text-red-400 ml-3 text-sm border border-[#cfdfe0]">
                {errors.email && touched.email ? errors.email : ""}
              </span>
              <div className="relative">
                <Field
                  className="w-full h-11 text-md rounded-md text-black bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                  type={view}
                  name="password"
                  id="signup_password"
                  placeholder="New Password"
                />
                <span
                  onClick={() =>
                    view === "text" ? setView("password") : setView("text")
                  }
                  className="absolute top-5 right-3"
                >
                  {view === "text" ? ClosedEye : OpenEye}
                </span>
              </div>
              <span
                className={`${
                  errors.password && touched.password ? "block" : "hidden"
                } text-red-400 ml-3 text-sm border border-[#cfdfe0]`}
              >
                {errors.password && touched.password ? errors.password : ""}
              </span>

              <Field
                className="w-full text-black h-11 text-md rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
              />
              <span className="block text-red-400 ml-3 text-sm border border-[#cfdfe0]">
                {errors.phone && touched.phone ? errors.phone : ""}
              </span>
              <Field
                className="mt-3"
                type="checkbox"
                name="agreeToTerms"
                id="agreeToTerms"
              />
              <label
                className="font-jakarta text-sm text-[#69627C] font-thin ml-2 "
                htmlFor="agreeToTerms"
              >
                Accept all Terms and Conditions
              </label>

              <button
                type="submit"
                className="mx-auto mt-7 h-11 px-10 block text-white rounded-md bg-primary-purple text-2xl font-jatkara"
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>
        <div className="h-24"></div>

        <button
          onClick={() => googleSignin()}
          className="flex w-full  py-2 bg-white rounded-full"
        >
          <div className="mx-auto justify-center items-center inline-flex">
            {Google}
            <div className="font-semibold text-lg ml-2 text-center text-black font-jakarta">
              Continue with Google
            </div>
          </div>
        </button>

        <div className="text-center mx-auto mt-3 text-black">
          Alraedy have an account?{" "}
          <Link className="font-bold hover:underline" href="/login">
            Login
          </Link>
        </div>
      </div>

      <div className="hidden lg:block">
        <img
          className=" absolute right-0 bottom-0 w-1/2"
          src={home_login}
          alt="Home Login"
        />
      </div>
    </div>
  );
};

export default redirectIfLoggedIn(SignUp);
