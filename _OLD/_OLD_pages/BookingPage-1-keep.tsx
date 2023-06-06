import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Container, Row, Box } from "../components/layouts";
import "./Home.scss";
import { useAuthContext } from "../hooks/useAuthContext";

const BookingPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useAuthContext();

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://wp-jwt-win.local/wp-json/moose-reg-user/v1/register",
        {
          username,
          email,
          password,
        }
      );

      // Log in after successful registration
      const loginResponse = await axios.post(
        "http://wp-jwt-win.local/wp-json/jwt-auth/v1/token",
        {
          username,
          password,
        }
      );

      // Store the token in local storage (or wherever you want)
      console.log("LOGIN AFTER REG", loginResponse.data);
      localStorage.setItem("wpJWTUser", loginResponse.data);

      alert("User registered and logged in successfully");
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
      </Row>
    </Container>
  );
};

export default BookingPage;
