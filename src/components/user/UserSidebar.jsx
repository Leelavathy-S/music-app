import React from "react";
import { NavLink } from "react-router-dom";
import { MdSupervisorAccount } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiDeleteBin7Fill } from "react-icons/ri";

const UserSidebar = () => {
  return (
    <div className="h-[100%] w-[20%] bg-slate-600 px-4 py-8 shrink-0">
      <ul className="flex-col gap-2">
        <li>
          {/* <NavLink
            to="/user-profile"
            className="py-2 px-4  rounded-lg font-semibold w-[100%] hover:bg-blue-600 flex items-center gap-2"
          > */}
           <NavLink
                      to="/user-profile"
                      end
                      className={(obj) => {
                        let { isActive } = obj;
                        return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2 text-lg ${
                          isActive && "bg-blue-600"
                        } `;
                      }}
                    >
            <span>
              <MdSupervisorAccount />{" "}
            </span>
            <span>My Account</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-profile"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2 text-lg ${
                isActive && "bg-blue-600"
              } `;
            }}
          >
            <span>
              <CgProfile />
            </span>
            <span>Update Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-picture"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2 text-lg ${
                isActive && "bg-blue-600"
              } `;
            }}
          >
            <span>
              <AiFillPicture />
            </span>
            <span>Update Picture</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-profile/update-password"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2 text-lg ${
                isActive && "bg-blue-600"
              } `;
            }}
          >
            <span>
              {" "}
              <RiLockPasswordFill />
            </span>
            <span>Update Password</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/user-profile/delete-account"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-red-700 flex items-center gap-2 text-lg ${
                isActive && "bg-red-500"
              } `;
            }}
          >
            <span>
              {" "}
              <RiDeleteBin7Fill />
            </span>
            <span>Delete Account</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
