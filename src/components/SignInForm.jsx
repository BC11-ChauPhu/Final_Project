import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { http } from "../service/config";
import useScrollToTop from "../service/useScrollToTop.jsx";

const SignInForm = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const signInValidate = (values) => {
    const errors = {};
    if (!/[A-Z]/.test(values.signInPassword)) {
      errors.signInPassword = "Password must have an uppercase letter *";
    } else if (values.signInPassword.length < 8) {
      errors.signInPassword = "Password must have at least 8 characters *";
    }
  };
  const signInFunc = () => {
    const pushData = async () => {
      try {
        const res = await http.post("/api/auth/signin", {
          email: signIn.values.signInEmail,
          Password: signIn.values.signInPassword,
        });

        const { token, user } = res.data.content;

        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/", { replace: true });
        window.location.reload();
      } catch (err) {
        const errorMessage =
          err?.response?.data?.content || "An error occurred";
        toast.error(errorMessage, {
          autoClose: 2000,
          position: "top-center",
        });
      }
    };
    pushData();
  };
  const signIn = useFormik({
    initialValues: {
      signInEmail: "",
      signInPassword: "",
    },
    validate: signInValidate,
    onSubmit: signInFunc,
  });
  return (
    <section className="z-10 flex w-full items-start justify-center transition-all">
      <div className="max-w-lg rounded-lg bg-white  pb-10 pt-3 md:pt-16">
        <div className="mb-6 flex flex-col justify-between gap-3 px-8 border-b border-b-gray-200">
          <h4 className="text-center text-2xl font-semibold pb-3 md:pb-0">
            Sign in with your account
          </h4>
          <p className="text-center hidden md:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            animi?
          </p>
        </div>

        <div className="px-8 md:p-0">
          <form onSubmit={signIn.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="signInEmail">Email</label>
              <input
                className="input-field"
                type="email"
                name="signInEmail"
                onChange={signIn.handleChange}
                value={signIn.values.signInEmail}
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="signInPassword">Password</label>
              <input
                className="input-field"
                type="password"
                name="signInPassword"
                onChange={signIn.handleChange}
                value={signIn.values.signInPassword}
                required
              />
            </div>
            <button
              className="mb-5 w-full rounded-lg bg-brand px-6 py-3 font-semibold uppercase text-white transition-all duration-500"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="text-center">
            Don't have an account yet?{" "}
            <NavLink
              to="/register"
              className="text-blue-700 transition-all duration-500 hover:cursor-pointer hover:text-blue-500"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
