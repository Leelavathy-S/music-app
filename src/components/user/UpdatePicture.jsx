import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContextAPI } from "../../context/AuthContext";
import Spinner from "../../helpers/Spinner";
// import Spinner from "../helpers/Spinner";

const UpdatePicture = () => {
  let [picture, setPicture] = useState(null);
let[preview,setPreview]=useState(null);
let{authUser}=useContext(AuthContextAPI)
let navigate=useNavigate()
let[isLoading,setIsLoading]=useState(false)


  const handleChange = (e) => {
    // console.dir(e.target.files[0]);
    let file = e.target.files[0];
    setPicture(file);
     
         
    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setPreview(url)

    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      if(!picture){
        toast.error("select a photo");
       
        return;
      }
      else{
        const data=new FormData()
        data.append("file",picture)
        data.append("upload_preset","innovators hub music")
        let response=await fetch("https://api.cloudinary.com/v1_1/dje6p1gli/image/upload",{
          method:"POST",
          body:data
        })
        let result=await response.json()
        console.log(result);
        await updateProfile(authUser,{
          photoURL:result.url
        })
        toast.success("Photo updated")
        navigate("/user-profile")
        
      }
      
    } 
    catch (error) {
      toast.error(error.message)
      
    }
    finally{
         setIsLoading(false)
    }
  };
  return (
    <section className="h-[100%] w-[100%]  flex items-center justify-center">
      <article className=" min-h-[300px] w-[40%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl">Upload Profile picture</h2>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="w-32 h-32 m-auto bg-gray-300 rounded-full">
            
            {preview ? (<img src={preview} alt=""className="h-[100%] w-[100%] rounded-full" />):(
              <div className="w-[100%] h-[100%] rounded-full flex items-center justify-center">
              No file selected </div>)}
          </div>
          <label
            htmlFor="picture"
            className="block w-[100%] py-2 text-center rounded-lg border-2 border-dotted"
            accept="image/*"
          >
            Select a photo
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={handleChange}
            name="picture"
          />
          <button className="py-2 w-[100%] bg-blue-600 rounded-lg hover:bg-blue-800 cursor-pointer">
            Upload Photo
          </button>
        </form>
      </article>
      {/* {isLoading && <Spinner/>} */}
      {isLoading && <Spinner/>}
    </section>
  );
};

export default UpdatePicture;
