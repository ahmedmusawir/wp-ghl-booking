import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Container, Row, Box } from "../components/layouts";
import "./Home.scss";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UserRegPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const { state } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    // REDIRECTING THE USER TO MORE INFO PAGE IF THE USER IS ALREADY LOGGED IN
    if (state.authIsReady) {
      navigate("/more-info");
    }
  }, [state.authIsReady, navigate]);

  // USING THE LOGIN HOOK SO THAT THE USER CAN BE LOGGED IN AFTER REGISTRATION
  const { login, error, setError, isLoading } = useLogin();

  const registerUser = async () => {
    setIsSpinning(true);
    try {
      const response = await axios.post(
        "http://wp-jwt-win.local/wp-json/moose-reg-user/v1/register",
        {
          username,
          email,
          password,
        }
      );

      console.log("Reg Response:", response);
      sessionStorage.setItem(
        "wpJWTUserId",
        JSON.stringify(response.data.user_id)
      );

      setIsSpinning(false);

      await login(username, password);

      navigate("/more-info");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error:", axiosError);

      if (axiosError.response) {
        alert(axiosError.message);
      }
    }
  };

  return (
    <Container className={""} FULL={false} pageTitle={"Home"}>
      <Row className={"prose"}>
        <h1 className="h1">Welcome To CyberDining</h1>
        <h3>Please Register:</h3>
        <div className="form-control lg:w-1/2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input input-primary mb-3"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input input-primary mb-3"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input input-primary mb-3"
          />

          <button onClick={registerUser} className="btn">
            Register
          </button>
        </div>
        <div className="flex justify-center mt-5">
          {isSpinning && (
            <div role="status flex justify-center">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default UserRegPage;