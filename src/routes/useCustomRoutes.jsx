import React from "react";
import { useRoutes } from "react-router-dom";
import HomeTemplate from "../templates/HomeTemplate";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import RegisterPage from "../pages/RegisterPage";
import SelectedLocationPage from "../pages/SelectedLocationPage";
import LocationTemplate from "../templates/LocationTemplate";
import LocationDetailPage from "../pages/LocationDetailPage";
import UserTemplate from "../templates/UserTemplate";
import UserPage from "../pages/UserPage";

const useCustomRoutes = () => {
  const myRoutes = useRoutes([
    {
      path: "",
      element: <HomeTemplate />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: "location",
      element: <LocationTemplate />,
      children: [
        {
          path: "selectedLocation/:id",
          element: <SelectedLocationPage />,
        },
        {
          path: `detail/:id`,
          element: <LocationDetailPage />,
        },
      ],
    },
    {
      path: "/sign-in",
      element: <SignInPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/profile",
      element: <UserTemplate />,
      children: [
        {
          path: `user/:id`,
          element: <UserPage />,
        },
      ],
    },
  ]);
  return myRoutes;
};

export default useCustomRoutes;
