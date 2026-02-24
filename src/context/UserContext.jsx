import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextAPI } from "./AuthContext";
import { __DB } from "../backend/FirebaseConfig";

export let userContextAPI = createContext();

let UserProvider = (props) => {
  let { authUser } = useContext(AuthContextAPI);
  let [userProfile, setUserProfile] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let fetchProfile = () => {
      let user_collection = doc(__DB, "user_profile", authUser?.uid);
      onSnapshot(user_collection, (data) => {
        // console.log(data.data());
        setUserProfile(data.data());
      });
    };

    if (authUser) {
      fetchProfile();
    }
    setIsLoading(false);
  }, [authUser]);

  return (
    <userContextAPI.Provider value={{ userProfile,isLoading}}>
      {props.children}
    </userContextAPI.Provider>
  );
};
export default UserProvider;
