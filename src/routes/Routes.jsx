import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../auth/Login";
import Home from "../pages/Home";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";
import UserLayout from "../components/user/UserLayout";
import UpdatePicture from "../components/user/UpdatePicture";
import UpadateProfile from "../components/user/UpadateProfile";
import UserAccount from "../components/user/UserAccount";
import UpdatePassword from "../components/user/UpdatePassword";
import DeleteAccount from "../components/user/DeleteAccount";
import AddAlbum from "../components/admin/AddAlbum";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminLayout from "../components/admin/AdminLayout";
import Dashboard from "../components/home/Dashboard";
import AlbumDetails from "../components/home/AlbumDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./publicRoutes";
import AdminRoutes from "./AdminRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "album-details",
            element: <AlbumDetails />,
          },
        ],
      },
      {
        path: "auth/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/register",
        element: (
          <PublicRoutes>
            {" "}
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: "auth/forget-password",
        element: (
          <PublicRoutes>
            <ForgetPassword />
          </PublicRoutes>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoutes>
            <AdminRoutes>
              <AdminLayout />
              </AdminRoutes>
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <AdminRoutes>
                <AdminDashboard />
                </AdminRoutes>
              </ProtectedRoutes>
            ),
          },

          {
            path: "add-album",
            element: (
              <ProtectedRoutes>
               <AdminRoutes>
               <AddAlbum />
               </AdminRoutes>
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: "user-profile",
        element: (
          <ProtectedRoutes>
            <UserLayout />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoutes>
                <UserAccount />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-picture",
            element: (
              <ProtectedRoutes>
                <UpdatePicture />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-profile",
            element: (
              <ProtectedRoutes>
                <UpadateProfile />
              </ProtectedRoutes>
            ),
          },
          {
            path: "update-password",
            element: (
              <ProtectedRoutes>
                <UpdatePassword />
              </ProtectedRoutes>
            ),
          },
          {
            path: "delete-account",
            element: (
              <ProtectedRoutes>
                <DeleteAccount />
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
]);
export default routes;
