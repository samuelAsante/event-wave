import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import AuthNavbar from "../components/AuthNavbar";
import toast from "react-hot-toast";
import api from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateUsername = (fullName) => {
    // Remove special characters and spaces, convert to lowercase
    const baseName = fullName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "")
      .trim();

    // Add a random number to make it unique
    const randomNum = Math.floor(Math.random() * 1000);
    return `${baseName}${randomNum}`;
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating your account...");

    try {
      const formattedData = {
        username: generateUsername(data.fullName),
        email: data.email,
        password: data.password,
        role: "user",
        profile: {
          fullName: data.fullName,
        },
      };

      const response = await api.post("/auth/register", formattedData);
      toast.dismiss(loadingToast);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.response?.data?.message?.includes("username")) {
        // If username exists, try again with a different random number
        onSubmit(data);
        return;
      }
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleError = (error) => {
    if (error.code === "ECONNABORTED") {
      toast.error("Connection timed out - please try again");
    } else if (!navigator.onLine) {
      toast.error("No internet connection");
    } else {
      toast.error(error.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-zinc-600">
      <AuthNavbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="p-6 w-full max-w-sm">
          <h1 className="text-2xl text-gray-100 font-bold mb-6">Sign Up</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                className="w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
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
                className={`w-full bg-zinc-800 text-white p-4 py-2 rounded-lg border border-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
