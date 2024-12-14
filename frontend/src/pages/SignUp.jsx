import React from "react";
// import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthNavbar from "../components/AuthNavbar";
import toast from "react-hot-toast";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const slides = [
  //   {
  //     title: "Join the Community",
  //     description: "Be part of amazing events on campus",
  //     color: "from-blue-500/20 to-purple-500/20",
  //   },
  //   {
  //     title: "Create Your Profile",
  //     description: "Showcase your interests and connect with others",
  //     color: "from-purple-500/20 to-pink-500/20",
  //   },
  //   {
  //     title: "Start Your Journey",
  //     description: "Begin your adventure with campus events",
  //     color: "from-pink-500/20 to-blue-500/20",
  //   },
  // ];

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, [slides.length]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      await api.post("/auth/register", data);
      toast.dismiss(loadingToast);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Failed to create account");
    }
  };

  return (
    <div className='min-h-screen bg-zinc-700'>
      <AuthNavbar />

      <div className='h-screen bg-zinc-700 flex flex-col justify-center items-center'>
        \{" "}
        <div className='w-full lg:w-[45%] p-8 flex items-center justify-center'>
          <div className='w-full max-w-sm space-y-8'>
            <div className='text-center'>
              <h1 className='text-2xl text-gray-100 font-bold mb-2'>Signup</h1>
              <p className='text-gray-400 mb-6'>
                Welcome back, please enter your details
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <input
                  type='text'
                  placeholder='Full Name'
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className='w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 outline-none transition-all'
                />
                {errors.fullName && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type='text'
                  placeholder='Username'
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className='w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 outline-none transition-all'
                />
                {errors.username && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type='email'
                  placeholder='Email address'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className='w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 outline-none transition-all'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type='password'
                  placeholder='Password'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        "Password must contain at least one letter and one number",
                    },
                  })}
                  className='w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700 focus:border-zinc-600 focus:ring-2 focus:ring-zinc-600 outline-none transition-all'
                />
                {errors.password && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors'
              >
                Sign Up
              </button>
            </form>

            <p className='mt-10 text-center text-sm text-gray-400'>
              Already have an account?{" "}
              <Link to='/login' className='text-blue-600 font-bold'>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
