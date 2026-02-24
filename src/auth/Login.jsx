import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../helpers/Spinner";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { __AUTH } from "../backend/FirebaseConfig";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../context/AuthContext";


const Login = () => {
  let [togglepassword, setTogglepassword] = useState(false);
   let[isLoading,setIsLoading]=useState(false)
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let { email, password } = data;
let navigate=useNavigate()

let {setAuthUser}=useContext(AuthContextAPI)

  let handleChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    setData({ ...data, [key]: value });
  };
  let handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try{
        let obj=await signInWithEmailAndPassword(__AUTH,email,password)
        // console.log(obj);
        let {user}=obj
        console.log(user);
        if(user.emailVerified===true){
          toast.success("Login  successfull")
          setAuthUser(user)

          navigate("/")
        }
        else{
          toast.error("verify your email")
          sendEmailVerification(user)
          
         
        }
        
        

      }catch(error){
        toast.error(error.message)

      }
                
  };
  return (
<section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900  flex justify-center items-center ">
      <div className="  w-[30%] bg bg-slate-700 rounded-lg">
        <header>
          <h1 className="text-center text-3xl p-2"> Login</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
            <div>
              <label htmlFor="" className="block text-md">
                Email
              </label>
              <input
                type="text"
                id="Email"
                placeholder="enter email"
                className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
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
                type={togglepassword ? "text" : "password"}
                id="Password"
                placeholder="enter password"
                className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
                onChange={handleChange}
                name="password"
                value={password}
              />

              {togglepassword ? (
                <FaEye
                  className="absolute top-8 right-3"
                  onClick={() => setTogglepassword(!togglepassword)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute top-8 right-3"
                  onClick={() => setTogglepassword(!togglepassword)}
                />
                
              )}
            </div>

            <div>
              <button className="bg-blue-600 p-2 w-[100%] font-semibold rounded-xl mt-2 cursor-pointer  hover:bg-blue-800">
                LOGIN
              </button>
            </div>
            <div className="mt-2 text-center">
              <span> Dont have an account? </span>
              <NavLink to="/auth/register" className={"text-red-500"}>
                {" "}
                register
              </NavLink>
            </div>
            <div className="mt-5 text-center">
             
              <NavLink to="/auth/forget-password" className="">
                
                Forget Password?
              </NavLink>
            </div>

          </form>
        </main>
      </div>
      {isLoading && <Spinner />}
    </section>    
  );
};

export default Login;
// import {sendEmailVerification,signInWithEmailAndPassword,} from "firebase/auth";
// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { FaEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import { __AUTH } from "../backend/FirebaseConfig";
// import Spinner from "../helpers/Spinner";
// import { AuthContextAPI } from "../context/AuthContext";

// const Login = () => {
//   let [togglePassword, setTogglepassword] = useState(false);

//   let [isloading, setIsloading] = useState(false);

//   let [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   let { email, password } = data;
//   let navigate = useNavigate();
//    let {setAuthUser}=useContext(AuthContextAPI)

//   let handleChange = (e) => {
//     let value = e.target.value;
//     let key = e.target.name;
//     setData({ ...data, [key]: value });
//   };
//   const handleSubmit = async (e) => {
//     setIsloading(true);
//     e.preventDefault();
//     try {
//       let obj = await signInWithEmailAndPassword(__AUTH, email, password);
//       let { user } = obj;
//       console.log(obj);
//       if (user.emailVerified == true) {
//         toast.success("Login successful");
//         navigate("/");
//         setAuthUser(user)
//       } else {
//         toast.error("Verify your email");
//         sendEmailVerification(user);
        
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setIsloading(false);
//     }
//   };
//   return (
//     <section className="h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center">
//       <div className="w-[30%]  bg-slate-700 rounded-lg">
//         <header>
//           <h1 className="text-3xl text-center p-2">Login</h1>
//         </header>
//         <main className="p-2">
//           <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter email"
//                 className="outline-none border-1  my-1 w-[100%] rounded-md pl-2"
//                 name="email"
//                 value={email}
//                 onChange={handleChange}
//               ></input>
//             </div>
//             <div className="relative">
//               <label htmlFor="password" className="block">
//                 Password
//               </label>
//               <input
//                 type={togglePassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Enter password"
//                 className="outline-none border-1  my-1 w-[100%] rounded-md pl-2"
//                 name="password"
//                 value={password}
//                 onChange={handleChange}
//               ></input>
//               {togglePassword ? (
//                 <FaEye
//                   className="absolute top-8 right-3"
//                   onClick={() => setTogglepassword(!togglePassword)}
//                 />
//               ) : (
//                 <FaEyeSlash
//                   className="absolute top-8 right-3"
//                   onClick={() => setTogglepassword(!togglePassword)}
//                 />
//               )}
//             </div>
//             <div>
//               <button className="p-2  hover:bg-blue-800 w-[100%] cursor-pointer rounded-xl bg-blue-600 mt-2 font-semibold">
//                 Login
//               </button>
//             </div>
//             <div className="mt-2 text-center ">
//               <span>Don't have an account ?</span>
//               <NavLink to="/auth/register" className="text-red-500">
//                 { " "}
//                 Register
//               </NavLink>
//             </div>
//             <div>
//               <div className="mt-5 text-center">
//                 <NavLink to ="/auth/forget-password" className="">
//                 ForgetPassword
//                 </NavLink>
//               </div>
//             </div>
//           </form>
//         </main>
//       </div>
//       {isloading && <Spinner />}
//     </section>
//   );
// };

// export default Login;