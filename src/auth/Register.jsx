import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { __AUTH } from "../backend/FirebaseConfig";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";


const Register = () => {
  let [togglePassword, setTogglepassword] = useState(false);
  let [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  let { username, email, password, confirmPassword } = data;
  let navigate = useNavigate();
  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username);
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);
    try {
      setIsLoading(true);
      if (password !== confirmPassword) {
        toast.error("confirm Password does not match");
        setData({ ...data, confirmPassword: "" });
      } else {
        let obj = await createUserWithEmailAndPassword(__AUTH, email, password);

        let {user} = obj;
        console.log(user);
        updateProfile(user, {
          displayName: username,
          photoURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2DE_uLjNJSkTptNg2yc4mwx1embdP7w8Gg&s",
        });
        sendEmailVerification(user);
        toast("Verification link sent ");
        toast.success("User Registered");
        navigate("/auth/login");
      }
    } catch (error) {
      console.log(error.message);
      // toast.error(error.message.slice(22,error.message.length-2))
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center ">
      <div className="w-[30%] bg-slate-700 rounded-lg">
        <header>
          <h1 className="text-center text-2xl p-2">Register</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className="block text-md">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="enter username"
                className="outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2"
                onChange={handleChange}
                name="username"
                value={username}
              />
            </div>       
                                     
            <div>
              <label htmlFor="" className="block text-md">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="enter email"
                className="outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2"
                onChange={handleChange}
                name="email"
                value={email}
              />
            </div>
            <div className="relative">
              <label htmlFor="" className="block text-md">
                Password
              </label>
              <input
                type={togglePassword ? "text" : "password"}
                id="password"
                placeholder="enter password"
                className="outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2"
                onChange={handleChange}
                name="password"
                value={password}
              />
              {togglePassword ? (
                <FaEye
                  className="absolute top-9 right-2"
                  onClick={() => setTogglepassword(!togglePassword)}
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute top-9 right-2"
                  onClick={() => setTogglepassword(!togglePassword)}
                />
              )}
            </div>
            <div className="relative">
              <label htmlFor="" className="block text-md">
                Confirm Password
              </label>
              <input
                type={toggleConfirmPassword ? "text" : "password"}
                id=" confirm password"
                placeholder="confirm password"
                className="outline-none border-1 w-[100%] py-1 my-1 rounded-md pl-2 "
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
              />
              {toggleConfirmPassword ? (
                <FaEye
                  className="absolute top-9 right-2"
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                />
              ) : (
                <FaRegEyeSlash
                  className="absolute top-9 right-2"
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                />
              )}
            </div>

            <button className="bg-blue-800 p-2 rounded-xl font-semibold mt-2 cursor-pointer hover:bg-blue-900">
              Register
            </button>

            <div className="mt-2 text-center">
              <span>Already have an account?</span>
              <NavLink to="/auth/login" className="text-red-500">
                Login
              </NavLink>
            </div>
          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Register;
