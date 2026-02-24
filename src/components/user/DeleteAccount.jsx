// import React, { useState } from "react";
// import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Spinner from "../../helpers/Spinner";
// import { deleteDoc } from "firebase/firestore";

// const DeleteAccount = () => {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   const handleReauthenticateAndDelete = async () => {
//     let user_collection=doc(__DB,"user_profile",authUser?.uid)
//     if (!user) {
//       toast.error("No user is logged in!");
//       return;
//     }

//     const credential = EmailAuthProvider.credential(user.email, password);

//     try {
//       // Re-authenticate the user
//       setIsLoading(true);
//       await reauthenticateWithCredential(user, credential);
//       await deleteDoc(user_collection)
//       // Now delete the account
//       await deleteUser(user);
//       await de
//       toast.success("Account deleted successfully!");
//       navigate("/auth/register");
//     } catch (error) {
//       toast.error(error.message);
//     }finally {
//         setIsLoading(false);
//       }
//   };

//   return (
//     <section className="h-screen w-full flex justify-center items-center bg-slate-900">
//       <div className="w-96 bg-slate-800 p-6 rounded-2xl text-center">
//         <h2 className="text-xl text-white mb-4">Delete Account</h2>
//         <p className="text-gray-300 mb-4">
//           Please enter your password to confirm deletion.
//         </p>
//         {/* <form className="mt-6 flex flex-col gap-4" >
//           <div>
//             <h3>Are you sure you want to delete the account?</h3>
//             <h2>If yes,Enter delete acccount</h2>
//             <input type="text"placeholder="Delete Account" className="outline-none w-full bg-white py-2 px-4 rounded-lg text-black" />
//           </div>
//         </form> */}
      
//         <input
//           type="password"      
//            className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
//           placeholder="Enter password"
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//         />
//         <button
//           onClick={handleReauthenticateAndDelete}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg  hover:bg-red-800 w-full cursor-pointer mt-4"
//         >
//           Delete My Account
//         </button>
//       </div>
//       {isLoading && <Spinner />}
//     </section>
//   );
// };

// export default DeleteAccount;


import React, { useState } from "react";
import { getAuth, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import Spinner from "../../helper/Spinner";
import Spinner from "../../helpers/Spinner";

const DeleteAccount = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReauthenticateAndDelete = async () => {
    if (!user) {
      toast.error("No user is logged in!");
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      // Re-authenticate the user
      setIsLoading(true);
      await reauthenticateWithCredential(user, credential);
      
      // Now delete the account
      await deleteUser(user);
      toast.success("Account deleted successfully!");
      navigate("/auth/register");
    } catch (error) {
      toast.error(error.message);
    }finally {
        setIsLoading(false);
      }
  };

  return (
    <section className="h-screen w-full flex justify-center items-center bg-slate-900">
      <div className="w-96 bg-slate-800 p-6 rounded-2xl text-center">
        <h2 className="text-xl text-white mb-4">Delete Account</h2>
        <p className="text-gray-300 mb-4">
          Please enter your password to confirm deletion.
        </p>
        <input
          type="password"
           className="outline-none border-1 w-[100%] my-1 rounded-md pl-2"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          onClick={handleReauthenticateAndDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 w-full cursor-pointer mt-4"
        >
          Delete My Account
        </button>
      </div>
      {isLoading && <Spinner />}
    </section>
  );
};

export default DeleteAccount;