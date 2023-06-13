import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { User } from "../constants";
import {
  FieldValues,
  PathValue,
  RegisterOptions,
  useForm,
} from "react-hook-form";
import Spinner from "./Spinner";

// FOLLOWING IS FOR HOOK FORM
interface IFormInputs {
  username: string;
  password: string;
}

const LoginFormPro = () => {
  const { login, error, setError, isLoading } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // FOLLOWING IS FOR HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  // FUNCTION FOR REACT HOOK FORM
  //   const onHookSubmit = (data: FieldValues) => {
  const onHookSubmit = async (data: IFormInputs) => {
    setError("");
    // console.log("Form Hook Output:", data.username);
    // console.log("Form Hook Output:", data.password);
    await login(data.username, data.password);
    navigate("/dashboard");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign In
            </h1>
            <form
              noValidate
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(onHookSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your User
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Username"
                  required
                  {...register("username", {
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {errors.username?.type === "required" && (
                  <p className="alert alert-warning my-2">
                    {errors.username.message}
                  </p>
                )}
                {errors.username?.type === "minLength" && (
                  <p className="alert alert-warning my-2">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password?.type === "required" && (
                  <p className="alert alert-warning my-2">
                    {errors.password.message}
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="alert alert-warning my-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-xs">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <br />
                <a
                  href="#"
                  className="text-xs font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button type="submit" className="w-full btn">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      {isLoading && <Spinner />}

      {error && <div className="alert alert-warning">{error}</div>}
    </section>
  );
};

export default LoginFormPro;
