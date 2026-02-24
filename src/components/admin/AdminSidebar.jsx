import React from 'react'

import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";




const AdminSidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)] sticky top-[70px] w-[20%] bg-slate-600 px-4 py-8 shrink-0">
                   <ul className="flex flex-col gap-2">
            <li>
             
               <NavLink
                          to="/admin"
                          end
                          className={(obj) => {
                            let { isActive } = obj;
                            return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2 text-lg ${
                              isActive && "bg-blue-600"
                            } `;
                          }}
                        >
                <span>
                <LuLayoutDashboard />
                </span>
                <span> Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/add-album"
                className={(obj) => {
                  let { isActive } = obj;
                  return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center gap-2 text-lg ${
                    isActive && "bg-blue-600"
                  } `;
                }}
              >
                <span>
                <MdLibraryMusic />
                </span>
                <span>Add Album</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      );
    };
  


export default AdminSidebar