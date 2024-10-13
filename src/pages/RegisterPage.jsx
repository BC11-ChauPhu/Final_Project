import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import React, { createContext } from "react";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

const RegisterPage = () => {
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
      <Header />
      <RegisterForm />
      <Footer />
      <ToastContainer />
    </NotificationContext.Provider>
  );
};

export default RegisterPage;
