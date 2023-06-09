import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Box } from "../components/layouts";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

const MoreInfoPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const navigate = useNavigate();

  const updateGhl = (data: IFormInput) => {
    axios
      .post(
        "https://services.leadconnectorhq.com/hooks/4rKuULHASyQ99nwdL1XH/webhook-trigger/348ac309-bb03-46e6-af2d-d6fe77f4107e",
        {
          params: data,
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSpinning(true);

    const userID = sessionStorage.getItem("wpJWTUserId");

    const user = JSON.parse(sessionStorage.getItem("wpJWTUser") || "{}");
    const url = `http://wp-jwt-win.local/wp-json/wp/v2/users/${userID}`;

    // DATA PAYLOAD FOR WP USERS ENDPOINT
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      acf: {
        phone: phone,
        address: address,
      },
    };

    // DATA PAYLOAD FOR GHL
    const updatedGHLUser: IFormInput = {
      firstName: firstName,
      lastName: lastName,
      email: user.user_email,
      phone: phone,
      address: address,
    };

    // UPDATING GHL CONTACT DB
    updateGhl(updatedGHLUser);

    // UPDATING WP USER DB
    try {
      const response = await axios.post(url, updatedUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setIsSpinning(false);

      console.log("User updated successfully:", response.data);
      // GOING TO BOOKING PAGE
      navigate("/booking");
    } catch (error) {
      console.error("Error:", error);
      //   alert(error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <Container FULL={false} className="prose" pageTitle="More Info Page">
      <h1>Additional Info:</h1>
      <form onSubmit={handleSubmit} className="form-control">
        <label className="label">
          <span className="label-text">First Name</span>
        </label>
        <input
          type="text"
          placeholder="First Name"
          className="input input-primary"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <label className="label">
          <span className="label-text">Last Name</span>
        </label>
        <input
          type="text"
          placeholder="Last Name"
          className="input input-primary"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <label className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="tel"
          placeholder="Phone"
          className="input input-primary"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />

        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <input
          type="text"
          placeholder="Address"
          className="input input-primary mb-3"
          required
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
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
    </Container>
  );
};

export default MoreInfoPage;
