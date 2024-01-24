import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";
import { Button, Divider, Inputbox, Logo } from "../components";
import useStore from "../store";
import { emailLogin, googleSignin } from "../utils/apiCalls";
import { saveUserInfo } from "../utils";
// import { googleSignin,emailLogin } from "../utils/apiCalls";

const LoginPage = () => {
  const { user, signIn, setIsLoading } = useStore();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = await googleSignin(tokenResponse?.access_token);
      if (user?.success === true) {
        saveUserInfo(user, signIn);
      } else {
        toast.error("Something went wrong, try signing up...");
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error("Login Error, try again...");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await emailLogin(data);
    setIsLoading(true);
    if (result?.success === true) {
      saveUserInfo(result, signIn);
    } else {
      toast.error(result?.message);
    }
  };

  if (user.token) window.location.replace("/");

  return (
    <div className="flex w-full  h-[100vh]">
      <div className="hidden md:flex flex-col gap-y-4 w-1/3 min-h-screen bg-black items-center justify-center ">
        <Logo type="login" />
        <span className="text-xl font-semibold text-white">Welcome, back!</span>
      </div>

      <div className="flex w-full md:w-2/3 h-full bg-white dark:bg-gradient-to-b md:dark:bg-gradient-to-r from-black via-[#071b3e] to-black items-center px-10 md:px-20 lg:px-40">
        <div className="h-full flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
          <div className="block mb-10 md:hidden">
            <Logo />
          </div>
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>
            </div>

            <Button
              onClick={() => googleLogin()}
              label="Sign in with Google"
              icon={<FcGoogle className="" />}
              styles="w-full flex flex-row-reverse gap-4 bg-white dark:bg-transparent text-black dark:text-white px-5 py-2.5 rounded-full border border-gray-300"
            />

            <Divider label="or sign in with email" />

            <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
              <div className="flex flex-col rounded-md shadow-sm -space-y-px gap-5">
                <Inputbox
                  label="Email Address"
                  name="email"
                  type="email"
                  isRequired={true}
                  placeholder="email@example.com"
                  value={data?.email}
                  onChange={handleChange}
                />

                <Inputbox
                  label="Password"
                  name="password"
                  type="password"
                  isRequired={true}
                  placeholder="Password"
                  value={data?.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                label=" Sign In"
                type="submit"
                styles="group relative w-full flex justify-center py-2.5 2xl:py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black dark:bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 mt-8"
              />
            </form>

            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
              <p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-rose-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default LoginPage;
