import React, { createContext } from "react";
import LocationDetail from "../components/LocationDetail";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackToTopButton from "../components/BackToTopButton";

export const NotificationContext = createContext();

const LocationDetailPage = () => {
  const showNotification = (content, type) => {
    switch (type) {
      case "error":
        return toast.error(content, options);
      case "success":
        return toast.success(content, options);
      default:
        break;
    }
  };
  return (
    <NotificationContext.Provider
      value={{ handleNotification: showNotification }}
    >
      <LocationDetail />
      <ToastContainer />
      <BackToTopButton />
    </NotificationContext.Provider>
  );
};

export default LocationDetailPage;
