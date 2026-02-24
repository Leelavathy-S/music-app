import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../context/AuthContext";
import { __DB } from "../../backend/FirebaseConfig";
// import { setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { userContextAPI } from "../../context/UserContext";

const UpadateProfile = () => {
  let { authUser } = useContext(AuthContextAPI);
  let { userProfile } = useContext(userContextAPI);

  let [data, setData] = useState({
    phoneNo: userProfile?.phonenumber,
    dob: userProfile?.dateOfBirth,
    languages: userProfile?.languages,
    gender: userProfile?.gender,
    address: userProfile?.address,
  });
  let { phoneNo, dob, languages, gender, address } = data;

  let handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setData({ ...data, [key]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let { displayName, email, photoURL, uid } = authUser;
    let payload = {
      name: displayName,
      email: email,
      photo: photoURL,
      id: uid,
      phonenumber: phoneNo,
      dateOfBirth: dob,
      gender: gender,
      languages: languages,
      address: address,
      role: "user",
    };
    try {
      console.log(payload);

      // let user_collection=doc(__DB,"user_profile",uid)
      // await setDoc(user_collection,payload({...data}))
      let user_collection = doc(__DB, "user_profile", uid);
      await setDoc(user_collection, payload);

      toast.success("Details Added");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section className="h-[100%] w-[100%]  flex items-center justify-center">
      <article className=" min-h-[400px] w-[60%] bg-slate-900 rounded-xl p-4">
        <h2 className="text-center text-2xl">Upload Profile Data</h2>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <article className="flex gap-5">
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="phoneNo" className="block text-[18px] ">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNo"
                placeholder="Enter phone number"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="phoneNo"
                value={phoneNo}
              />
            </div>

            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="phoneNo" className="block text-[18px] ">
                Date of birth
              </label>
              <input
                type="date"
                id="DOB"
                placeholder="Enter date of birth"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="dob"
                value={dob}
              />
            </div>
          </article>

          <article className="flex  gap-5">
            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="languages " className="block text-[18px] ">
                Languages
              </label>
              <input
                type="text"
                id="languages"
                placeholder="Enter Languages"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="languages"
                value={languages}
              />
            </div>

            <div className="flex gap-2 flex-col w-[48%]">
              <label htmlFor="" className="block text-[18px] ">
                Gender
              </label>
              <div className="flex gap-2 font-semibold text-lg">
                <input
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="male"
                  checked={gender === "male"}
                />

                <span>Male</span>
                <input
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="female"
                  checked={gender === "female"}
                />
                <span>Female</span>
                <input
                  type="radio"
                  name="gender"
                  onChange={handleChange}
                  value="others"
                  checked={gender === "others"}
                />
                <span>Others</span>
              </div>
            </div>
          </article>
          <article>
            <div className="flex gap-2 flex-col w-[100%] ">
              <label htmlFor="address" className="block text-[18px] ">
                Address
              </label>

              <textarea
                id="address"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                value={address}
                name="address"
              ></textarea>
            </div>
          </article>
          <div className="flex gap-2 flex-col ">
            <button className="outline-none bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-800 cursor-pointer text-lg">
              Submit
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpadateProfile;
