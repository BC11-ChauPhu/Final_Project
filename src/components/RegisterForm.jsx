import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { http } from "../service/config";
import { toast } from "react-toastify";
const RegisterForm = () => {
  const navigate = useNavigate();
  const generateRandomId = () => Math.floor(Math.random() * 10000);

  const registerValidate = (values) => {
    const errors = {};
    if (!/^[A-Z]/.test(values.registerPassword)) {
      errors.registerPassword = "* Password must have an uppercase letter *";
    } else if (values.registerPassword.length < 8) {
      errors.registerPassword = "* Password must have at lteast 8 characcters";
    }
    return errors;
  };
  const registerFunc = () => {
    const pushData = async () => {
      try {
        const res = await http.post("/api/auth/signup", {
          id: register.values.registerId,
          name: register.values.registerUserName,
          email: register.values.registerEmail,
          password: register.values.registerPassword,
          phone: register.values.registerPhone,
          birthday: register.values.registerBirthday,
          gender: register.values.registerGender,
          role: register.values.registerRole,
        });

        navigate("/sign-in");
        window.location.relaod();
      } catch (err) {
        console.log(err);
        const errorMessage =
          err?.response?.data?.content || "An error has occured ";
        toast.error(errorMessage, {
          autoClose: 2000,
          position: "top-center",
        });
      }
    };
    pushData();
  };
  const register = useFormik({
    initialValues: {
      registerId: generateRandomId(),
      registerUserName: "",
      registerEmail: "",
      registerPassword: "",
      registerPhone: "",
      registerBirthday: "",
      registerGender: true,
      registerRole: "ADMIN",
    },
    validate: registerValidate,
    onSubmit: registerFunc,
  });

  return (
    <section className="z-10 flex w-full items-start justify-center transition-all">
      <div className="max-w-lg rounded-lg bg-white px-8 md:px-14 py-3 md:py-16">
        <div className="mb-6 flex flex-col justify-between gap-3 border-b border-b-gray-200 pb-3">
          <h4 className="text-center text-2xl font-semibold">Register</h4>
          <p className="text-center hidden md:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
            animi?
          </p>
        </div>

        <div>
          <form onSubmit={register.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="registerUserName">User Name</label>
              <input
                id="registerUserName"
                className="input-field"
                type="text"
                name="registerUserName"
                onChange={register.handleChange}
                value={register.values.registerUserName}
                required
              />
              {register.errors.registerUserName ? (
                <div className="text-red-600">
                  {register.errors.registerUserName}
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="registerEmail">Email</label>
              <input
                id="registerEmail"
                className="input-field"
                type="email"
                name="registerEmail"
                onChange={register.handleChange}
                value={register.values.registerEmail}
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="registerPassword">Password</label>
              <input
                id="registerPassword"
                className="input-field"
                type="password"
                name="registerPassword"
                onChange={register.handleChange}
                value={register.values.registerPassword}
                required
              />
              {register.errors.registerPassword ? (
                <div className="text-red-600">
                  {register.errors.registerPassword}
                </div>
              ) : null}
            </div>

            <div className="mb-3">
              <label htmlFor="registerPhone">Phone Number</label>
              <input
                id="registerPhone"
                className="input-field"
                type="tel"
                name="registerPhone"
                onChange={register.handleChange}
                value={register.values.registerPhone}
                required
              />
            </div>

            <button
              className="mb-5 w-full rounded-lg bg-brand px-6 py-3 font-semibold uppercase text-white transition-all duration-500"
              type="submit"
            >
              Register
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <NavLink
              to="/sign-in"
              className="text-blue-700 transition-all duration-500 hover:cursor-pointer hover:text-blue-500"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
