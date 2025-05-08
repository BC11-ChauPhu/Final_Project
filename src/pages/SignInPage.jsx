import Footer from "../components/Footer";
import SignInForm from "../components/SignInForm";
import React, { createContext } from "react";
import Header from "../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = createContext();

const SignInPage = () => {
	const showNotification = (content, type) => {
		const options = {
			autoClose: 2000,
			position: "top-left",
		};
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
			<SignInForm />
			<Footer />
			<ToastContainer />
		</NotificationContext.Provider>
	);
};

export default SignInPage;
