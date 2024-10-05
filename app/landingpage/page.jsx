"use client";
import React, { useState, useEffect } from "react";
import home from "../assets/images/home.png";
import sofa_banner from "../assets/images/sofa_banner.png";
import room_home from "../assets/images/room_home.png";
import chair from "../assets/images/chair.png";
import kajaria from "../assets/images/kajaria.png";
import dulux from "../assets/images/dulux.png";
import asian_paints from "../assets/images/asian_paints.png";
import berger from "../assets/images/berger.png";
import somany_tiles from "../assets/images/somany_tiles.png";
import apply_design from "../assets/images/apply_design.png";
import {
  left_arrow,
  long_logo,
  right_arrow,
  long_logo_white,
  linkedin,
  X,
  facebook,
  instagram,
  youtube,
  long_logo_small,
} from "../assets/icons";
import { Carousel, IconButton } from "@material-tailwind/react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import Link from "next/link";

const LandingPage = () => {
  const [feature, setFeature] = useState(1);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [showBackground, setShowBackground] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowBackground(window.innerWidth > 959);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#eef1f2]">
      <nav className="nav pt-5 flex mx-5 lg:mx-24 justify-between">
        <span className="">{showBackground ? long_logo : long_logo_small}</span>
        <ul className=" lg:flex hidden ">
          <li className="font-semibold text-xl content-center cursor-pointer hover:underline">
            Products
          </li>
          <li className="font-semibold text-xl content-center cursor-pointer hover:underline mx-10">
            How we work?
          </li>
          <li className="font-semibold text-xl content-center cursor-pointer hover:underline">
            Contact Us
          </li>
        </ul>
        <div className="flex">
          <Link
            href="/login"
            className="border-2 w-fit ml-auto content-center text-center text-xl  border-primary-purple rounded-md lg:mr-10 h-11 lg:h-full px-7 text-primary-purple font-medium"
          >
            Login
          </Link>
        </div>
      </nav>
      <div
        className="w-full lg:h-[100vh] px-5 lg:pl-24 hero bg-no-repeat bg-right"
        style={{
          backgroundImage: showBackground ? `url(${home})` : "none",
          backgroundSize: showBackground ? "115vh 70vh" : "none",
        }}
      >
        <div className="lg:w-[742px] mt-10 lg:pt-40  text-primary-purple text-shadow text-5xl lg:text-6xl font-semibold lg:font-bold leading-snug">
          Transform Your <br className="hidden lg:block" /> Space with Firefly's
          <br className="hidden lg:block" /> 3D Visualization
        </div>{" "}
        <div className="mt-7 lg:w-1/2 text-black  lg:text-xl font-medium">
          Visualize your dream home in real-time with our cutting-edge
          technology
        </div>
        <button className="mt-16 flex w-full lg:w-fit py-4 px-4 lg:py-2 bg-primary-purple rounded-md justify-center items-center">
          <Link to="/" className="flex text-center text-white text-3xl lg:text-xl font-normal ">
            Start for free
          </Link>
        </button>
      </div>

      <div className="mobile-img mt-5 lg:hidden">
        <img src={home} alt="Home" />
      </div>

      <div className="features mt-20">
        <div className="w-full text-center text-primary-black text-4xl font-bold font-['Avenir Next LT Pro'] leading-[57.60px]">
          Transform Your Space with Firefly's 3D <br /> Visualization
        </div>

        <div className="lg:flex hidden justify-center mt-7">
          <button
            onClick={() => setFeature(1)}
            className={`px-5 p-0.5 rounded-full border-2 border-${
              feature === 1 ? "primary-purple" : "neutral-400"
            } justify-center items-center inline-flex`}
          >
            <div
              className={`text-center font-semibold text-${
                feature === 1 ? "primary-purple" : "[#747474]"
              }`}
            >
              Furniture
            </div>
          </button>
          <button
            onClick={() => setFeature(2)}
            className={`px-5 p-0.5 mx-7 rounded-full border-2 border-${
              feature === 2 ? "primary-purple" : "neutral-400"
            } justify-center items-center inline-flex`}
          >
            <div
              className={`text-center font-semibold text-${
                feature === 2 ? "primary-purple" : "[#747474]"
              }`}
            >
              3D Interior model
            </div>
          </button>
          <button
            onClick={() => setFeature(3)}
            className={`px-5 p-0.5 rounded-full border-2 border-${
              feature === 3 ? "primary-purple" : "neutral-400"
            } justify-center items-center inline-flex`}
          >
            <div
              className={`text-center font-semibold text-${
                feature === 3 ? "primary-purple" : "[#747474]"
              }`}
            >
              Customisation
            </div>
          </button>
        </div>
        <div className="lg:flex lg:justify-center mt-16 space-y-16 lg:space-y-0">
          <div
            onClick={() => setFeature(1)}
            className={`px-7 py-4 mx-5 lg:w-[380px] rounded-t-xl  ${
              feature === 1
                ? "lg:border-2 border-primary-purple lg:border-b-4 bg-[#E8EDF0]"
                : "lg:shadow-custom lg:opacity-50 lg:hover:opacity-75 bg-[#E8EDF0] lg:bg-white cursor-pointer"
            }`}
          >
            <div className="rounded-xl py-3 border-2 border-neutral-300 bg-[#D9DCDE]">
              <img
                className="mx-auto"
                width={150}
                height={150}
                src={chair}
                alt="chair"
              />
            </div>
            <p className="mt-4 text-primary-black text-2xl font-bold ">
              Visualize Furniture with 3D Models
            </p>
            <p className="lg:text-sm mt-3 mr-3 font-medium">
              Easily upload your room plan and receive a customized design draft
              within just 30 minutes.
            </p>
            <button
              disabled={feature !== 1}
              className={`my-10 flex mx-auto px-5 lg:px-4 py-3 lg:py-2 bg-primary-purple rounded-md justify-center items-center ${
                feature === 1 ? "lg:opacity-100" : "lg:opacity-0"
              } `}
            >
              <div className="flex text-center text-white text-2xl lg:text-xl font-normal ">
                Try for Free
              </div>
            </button>
          </div>
          <div
            onClick={() => setFeature(2)}
            className={`px-7 py-4 mx-5 lg:w-[380px] rounded-t-xl ${
              feature === 2
                ? "lg:border-2 border-primary-purple lg:border-b-4 bg-[#E8EDF0]"
                : "lg:shadow-custom lg:opacity-50 lg:hover:opacity-75 bg-[#E8EDF0] lg:bg-white cursor-pointer"
            }`}
          >
            <div className="rounded-xl py-3 border-2 border-neutral-300 bg-[#D9DCDE]">
              <img
                className="mx-auto"
                width={150}
                height={150}
                src={chair}
                alt="chair"
              />
            </div>
            <p className="mt-4 text-primary-black text-2xl font-bold ">
              Experience Your Space Before It's Real
            </p>
            <p className="lg:text-sm mt-3 mr-3 font-medium">
              Use our advanced 3D interior modeling to see how your entire space
              will look and feel.
            </p>
            <button
              disabled={feature !== 2}
              className={`my-10 flex mx-auto px-5 lg:px-4 py-3 lg:py-2 bg-primary-purple rounded-md justify-center items-center ${
                feature === 2 ? "lg:opacity-100" : "lg:opacity-0"
              } `}
            >
              <div className="flex text-center text-white text-2xl lg:text-xl font-normal ">
                Try for Free
              </div>
            </button>
          </div>
          <div
            onClick={() => setFeature(3)}
            className={`px-7 py-4 mx-5 lg:w-[380px] rounded-t-xl ${
              feature === 3
                ? "lg:border-2 border-primary-purple lg:border-b-4 bg-[#E8EDF0]"
                : "lg:shadow-custom lg:opacity-50 lg:hover:opacity-75 bg-[#E8EDF0] lg:bg-white cursor-pointer"
            }`}
          >
            <div className="rounded-xl py-3 border-2 border-neutral-300 bg-[#D9DCDE]">
              <img
                className="mx-auto"
                width={150}
                height={150}
                src={chair}
                alt="chair"
              />
            </div>
            <p className="mt-4 text-primary-black text-2xl font-bold ">
              Tailored to Your Taste
            </p>
            <p className="lg:text-sm mt-3 mr-3 font-medium">
              Our customization options ensure your home reflects your unique
              style and preferences.
            </p>
            <button
              disabled={feature !== 3}
              className={`my-10 flex mx-auto px-5 lg:px-4 py-3 lg:py-2 bg-primary-purple rounded-md justify-center items-center ${
                feature === 3 ? "lg:opacity-100" : "lg:opacity-0"
              } `}
            >
              <div className="flex text-center text-white text-2xl lg:text-xl font-normal ">
                Try for Free
              </div>
            </button>
          </div>
        </div>
        <h2 className="text-center font-semibold text-2xl mt-14">Trusted By</h2>
        <div className="flex mt-7 w-full bg-[#E8EDF0] py-5 justify-between px-10">
          <img
            className="w-[100px] lg:w-[200px] h-[50px] lg:h-[100px] my-auto"
            src={dulux}
            alt="dulux"
          />
          <img
            className="w-[100px] lg:w-[200px] h-[25px] lg:h-[50px] my-auto"
            src={kajaria}
            alt="kajaria"
          />
          <img
            className="w-[70px] lg:w-[150px] h-[70px] lg:h-[150px] my-auto"
            src={asian_paints}
            alt="asian paints"
          />
          <img
            className="hidden lg:block w-[100px] lg:w-[175px] h-[40px] lg:h-[60px] my-auto"
            src={somany_tiles}
            alt="somany tiles"
          />
          <img
            className="hidden lg:block w-[100px] lg:w-[170px] h-[50px] lg:h-[100px] my-auto"
            src={berger}
            alt="berger"
          />
        </div>
      </div>

      <div className="designs">
        <h2 className="w-full text-center text-primary-black text-4xl font-bold mt-32 ">
          Try Designs On <br className="block lg:hidden" /> 3D Space
        </h2>
        <div className="mx-5 gap-4 lg:mx-24 grid grid-cols-2 lg:grid-cols-4 justify-center mt-24">
          <div>
            <img
              width={300}
              className="rounded-lg"
              src={apply_design}
              alt="room"
            />
            <button className="border-2 border-primary-purple text-sm lg:text-md rounded-sm lg:rounded-md flex mx-auto mt-3 px-4 py-1.5 lg:py-2 text-primary-purple font-medium">
              Apply Design
            </button>
          </div>
          <div>
            <img
              width={300}
              className="rounded-lg"
              src={apply_design}
              alt="room"
            />
            <button className="border-2 border-primary-purple text-sm lg:text-md rounded-sm lg:rounded-md flex mx-auto mt-3 px-4 py-1.5 lg:py-2 text-primary-purple font-medium">
              Apply Design
            </button>
          </div>
          <div>
            <img
              width={300}
              className="rounded-lg"
              src={apply_design}
              alt="room"
            />
            <button className="border-2 border-primary-purple text-sm lg:text-md rounded-sm lg:rounded-md flex mx-auto mt-3 px-4 py-1.5 lg:py-2 text-primary-purple font-medium">
              Apply Design
            </button>
          </div>
          <div>
            <img
              width={300}
              className="rounded-lg"
              src={apply_design}
              alt="room"
            />
            <button className="border-2 border-primary-purple text-sm lg:text-md rounded-sm lg:rounded-md flex mx-auto mt-3 px-4 py-1.5 lg:py-2 text-primary-purple font-medium">
              Apply Design
            </button>
          </div>
        </div>
      </div>

      <div
        className="banner content-end lg:w-10/12 m-auto mt-52 h-[300px] lg:h-[670px]"
        style={{
          backgroundImage: `url(${sofa_banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button className="mx-auto mb-16 flex px-5 py-3 bg-primary-purple rounded-sm justify-center items-center">
          <div className="flex text-center text-white text-2xl font-normal ">
            Shop Now
          </div>
        </button>
      </div>

      <div className="steps">
        <h2 className="w-full text-center text-primary-black text-4xl font-bold mt-24">
          Steps to Get Your <br className="lg:hidden" /> Dream{" "}
          <br className="hidden lg:hidden" /> Home
        </h2>
      </div>

      <div className="mobile-steps lg:hidden">
        <div className="w-10/12 mx-auto my-20">
          <div className="p-5">
            <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
              1
            </div>
            <p className="text-black font-medium mt-7">
              Easily upload your room plan and receive a customized design draft
              within just 30 minutes.Easily upload your room plan and receive a
              customized design draft within just 30 minutes.
            </p>
          </div>
          <img
            className="mx-auto"
            src="https://placehold.jp/450x300.png"
            alt="placeholder"
          />
        </div>
        <div className="w-10/12 mx-auto mb-20">
          <div className=" p-5">
            <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
              2
            </div>
            <p className="text-black font-medium mt-7">
              Easily upload your room plan and receive a customized design draft
              within just 30 minutes.Easily upload your room plan and receive a
              customized design draft within just 30 minutes.
            </p>
          </div>
          <img
            className="mx-auto"
            src="https://placehold.jp/450x300.png"
            alt="placeholder"
          />
        </div>
        <div className="w-10/12 mx-auto mb-20">
          <div className=" p-5">
            <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
              3
            </div>
            <p className="text-black font-medium mt-7">
              Easily upload your room plan and receive a customized design draft
              within just 30 minutes.Easily upload your room plan and receive a
              customized design draft within just 30 minutes.
            </p>
          </div>
          <img
            className="mx-auto"
            src="https://placehold.jp/450x300.png"
            alt="placeholder"
          />
        </div>
        <div className="w-10/12 mx-auto mb-20">
          <div className=" p-5">
            <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
              4
            </div>
            <p className="text-black font-medium mt-7">
              Easily upload your room plan and receive a customized design draft
              within just 30 minutes.Easily upload your room plan and receive a
              customized design draft within just 30 minutes.
            </p>
          </div>
          <img
            className="mx-auto"
            src="https://placehold.jp/450x300.png"
            alt="placeholder"
          />
        </div>
      </div>

      {showBackground && (
        <Carousel
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-0 z-50 flex gap-2 w-full mx-auto bg-[#eef1f2] ">
              <div className="w-1/3 mx-auto mt-10 ">
                <Stepper
                  activeStep={activeIndex}
                  isLastStep={(value) => setIsLastStep(value)}
                  isFirstStep={(value) => setIsFirstStep(value)}
                >
                  <Step
                    className="w-7 h-7 "
                    onClick={() => setActiveIndex(0)}
                  ></Step>
                  <Step
                    className="w-7 h-7"
                    onClick={() => setActiveIndex(1)}
                  ></Step>
                  <Step
                    className="w-7 h-7"
                    onClick={() => setActiveIndex(2)}
                  ></Step>
                  <Step
                    className="w-7 h-7"
                    onClick={() => setActiveIndex(3)}
                  ></Step>
                </Stepper>
              </div>
            </div>
          )}
          className="bg-white py-10 mt-16"
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 left-4 -translate-y-2/4"
              disabled={isFirstStep}
            >
              {left_arrow}
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 !right-4 -translate-y-2/4"
              disabled={isLastStep}
            >
              {right_arrow}
            </IconButton>
          )}
        >
          <div className="grid grid-cols-2 w-10/12 mx-auto mb-20">
            <div className=" p-5">
              <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
                1
              </div>
              <p className="text-black font-medium mt-7">
                Easily upload your room plan and receive a customized design
                draft within just 30 minutes.Easily upload your room plan and
                receive a customized design draft within just 30 minutes.
              </p>
            </div>
            <img
              className="mx-auto"
              src="https://placehold.jp/450x300.png"
              alt="placeholder"
            />
          </div>
          <div className="grid grid-cols-2 w-10/12 mx-auto mb-20">
            <div className=" p-5">
              <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
                2
              </div>
              <p className="text-black font-medium mt-7">
                Easily upload your room plan and receive a customized design
                draft within just 30 minutes.Easily upload your room plan and
                receive a customized design draft within just 30 minutes.
              </p>
            </div>
            <img
              className="mx-auto"
              src="https://placehold.jp/450x300.png"
              alt="placeholder"
            />
          </div>
          <div className="grid grid-cols-2 w-10/12 mx-auto mb-20">
            <div className=" p-5">
              <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
                3
              </div>
              <p className="text-black font-medium mt-7">
                Easily upload your room plan and receive a customized design
                draft within just 30 minutes.Easily upload your room plan and
                receive a customized design draft within just 30 minutes.
              </p>
            </div>
            <img
              className="mx-auto"
              src="https://placehold.jp/450x300.png"
              alt="placeholder"
            />
          </div>
          <div className="grid grid-cols-2 w-10/12 mx-auto mb-20">
            <div className=" p-5">
              <div className="rounded-full mx-auto h-24 w-24 text-shadow text-center content-center text-4xl font-bold text-white bg-[#835DF0]">
                4
              </div>
              <p className="text-black font-medium mt-7">
                Easily upload your room plan and receive a customized design
                draft within just 30 minutes.Easily upload your room plan and
                receive a customized design draft within just 30 minutes.
              </p>
            </div>
            <img
              className="mx-auto"
              src="https://placehold.jp/450x300.png"
              alt="placeholder"
            />
          </div>
        </Carousel>
      )}

      <div
        className="footer_hero w-full grif grid-cols-1 content-center m-auto mt-20 h-[60vh] lg:h-[100vh] brightness-90 rounded-b-[40px] lg:rounded-b-[60px]"
        style={{
          backgroundImage: `url(${room_home})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-white text-4xl font-sansita italic text-center font-semibold lg:font-medium  text-shadow-md">
          Experience efficient design solutions for your space today!
        </p>
        <button className="flex mx-auto text-xl italic font-semibold lg:text-3xl rounded-full bg-[#ef7e70] px-10 lg:px-24 py-6 lg:py-8 mt-10 font-sansita text-white">
          Start your Journey
        </button>
      </div>

      <div className="desktop-footer hidden lg:grid w-full -mt-14 pt-32 px-14 bg-primary-purple grid-cols-12 font-poppins font-medium text-white">
        <div className="col col-span-6">{long_logo_white}</div>
        <div className="col col-span-3 text-xl ">
          Helpline
          <span className="block text-lg mt-3">+91 7855088560</span>
        </div>
        <div className="col col-span-3 text-xl ">
          Follow Us
          <span className="block mt-3 ">
            <button className="w-12 h-12">{linkedin}</button>
            <button className="w-12 h-12">{facebook}</button>
            <button className="w-12 h-12">{X}</button>
            <button className="w-12 h-12">{instagram}</button>
            <button className="w-12 h-12">{youtube}</button>
          </span>
        </div>
        <div className="col-span-12 text-xl mt-14">
          <button className="inline-flex">Products</button>
          <button className="inline-flex mx-20">How we work?</button>
          <button className="inline-flex">Contact Us</button>
        </div>
        <hr className="col-span-12 mt-14" />
        <div className="col-span-12 font-light space-x-10 my-14">
          <button className="inline-flex">© 2024 All rights reserved</button>
          <button className="inline-flex underline">Privacy Policy</button>
          <button className="inline-flex underline">Terms of Service</button>
          <button className="inline-flex underline">Cookies Settings</button>
        </div>
      </div>
      <div className="mobile-footer grid lg:hidden grid-cols-12 -mt-12 py-24 px-5 bg-primary-purple font-poppins font-medium text-white">
        <div className="col-span-12">{long_logo_white}</div>
        <div className="col-span-4  mt-10">
          Helpline
          <span className="block  mt-2">+91 7855088560</span>
        </div>
        <div className="col-span-4  mt-10 ml-10">
          Products
          <span className="block  mt-2">Contact Us</span>
        </div>
        <div className="col-span-4  mt-10 text-right"> How we work?</div>
        <div className="col col-span-12 mt-10">
          Follow Us
          <span className="block mt-2 space-x-5">
            <button className="w-5 h-5">{linkedin}</button>
            <button className="w-5 h-5">{instagram}</button>
            <button className="w-5 h-5">{X}</button>
            <button className="w-5 h-5">{facebook}</button>
            <button className="w-5 h-5">{youtube}</button>
          </span>
        </div>
        <div className="col-span-12 font-light text-sm my-14">
          <button className="block">© 2024 All rights reserved</button>
          <button className="inline-flex underline mt-5">Privacy Policy</button>
          <button className="inline-flex underline mt-5 mx-10">
            Terms of Service
          </button>
          <button className="inline-flex underline mt-5">
            Cookies Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
