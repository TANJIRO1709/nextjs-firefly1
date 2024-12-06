"use client";
import React, { useState, useEffect } from "react";
import { long_logo, ClosedEye, Google, OpenEye } from "../assets/icons";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import page_break from "../assets/images/page_break.png";
import working_girl from "../assets/images/working_girl.png";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "../context/userContext";

const Login = () => {
  const userContext = useContext(UserContext);
  const { user, login, signup, logout, googleSignin } = userContext;
  const [showBackground, setShowBackground] = useState(false);
  const [view, setView] = useState("password");

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth > 1140);
    };
    handleResize();
    document.body.style.backgroundColor = "#cfdfe0";
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.backgroundColor = "";
    };
  }, []);

  const LoginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (<>
  <div>
    <div
      className={`bg-[#cfdfe0] h-[100vh] content-center `}
      style={{
        backgroundImage: showBackground ? `url(${working_girl})` : "none",
        backgroundSize: "120vh 90vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <div className="xl:w-4/12 mx-auto px-5 max-w-[500px] xl:mx-40">
        <div className="flex justify-center">{long_logo}</div>
        <div className="text-center text-primary-black text-3xl font-extrabold mt-7">
          Login
        </div>

        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={LoginValidationSchema}
          onSubmit={(values) => {
            console.log("login values => ", values);
            login(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-8">
              <Field
                className="w-full h-11 text-md rounded-md text-black bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                type="text"
                name="email"
                id="login_email"
                placeholder="Enter your email"
              />
              <span className="text-red-400 ml-3 text-sm">
                {errors.email && touched.email ? errors.email : ""}
              </span>
              <div className="relative">
                <Field
                  className="w-full h-11 text-md text-black rounded-md bg-[#e9feff] border-2 border-gray-500 pl-3 font-jakarta focus:border-primary-purple mt-3"
                  type={view}
                  name="password"
                  id="login_password"
                  placeholder="Password"
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
              <span className="text-red-400 ml-3 text-sm ">
                {errors.password && touched.password ? errors.password : ""}
              </span>

              <button
                type="submit"
                className="mx-auto mt-10 h-11 px-10 block text-white rounded-md bg-primary-purple text-2xl font-jatkara"
              >
                Login
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
          Don't have an account?{" "}
          <Link className="font-bold hover:underline" href="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
