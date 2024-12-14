import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthNavbar from "../components/AuthNavbar";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Events",
      description: "Find and join amazing events on campus",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "Connect with People",
      description: "Build meaningful connections with like-minded individuals",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Create Memories",
      description: "Make lasting memories at unforgettable events",
      color: "from-pink-500/20 to-blue-500/20",
    },
  ];

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    control._disableForm(true);
    const loadingToast = toast.loading("Signing in...");
    try {
      const response = await api.post("/auth/login", values);
      toast.dismiss(loadingToast);
      toast.success("Successfully logged in!");
      login(response.data);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
      setError("root.serverError", {
        type: "server",
        message:
          error.response?.data?.message || "An error occurred during login",
      });
    }
    control._disableForm(false);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <AuthNavbar />

      <div className='h-screen bg-zinc-700 flex flex-col justify-center items-center'>
        <div className='w-full lg:w-[45%] p-8 flex items-center justify-center'>
          <div className='w-full max-w-sm space-y-8'>
            <div className='text-center'>
              <h1 className='text-2xl text-gray-100 font-bold mb-2'>Login</h1>
              <p className='text-gray-400 mb-6'>
                Welcome back, please enter your details
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                Login
              </button>
            </form>

            <p className='mt-10 text-center text-sm text-gray-400'>
              Don't have an account?{" "}
              <Link to='/signup' className='text-blue-600 font-bold'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
