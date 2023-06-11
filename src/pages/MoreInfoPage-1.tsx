import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Box } from "../components/layouts";

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

      console.log("User updated successfully:", response.data);
    } catch (error) {
      console.error("Error:", error);
      //   alert(error.response?.data?.message || 'Unknown error');
    }
  };

  return (
    <Container FULL={false} className="" pageTitle="More Info Page">
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
    </Container>
  );
};

export default MoreInfoPage;
