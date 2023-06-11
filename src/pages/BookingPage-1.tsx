import React, { useState } from "react";
import { Container, Row, Box } from "../components/layouts";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const BookingPage: React.FC = () => {
  const [details, setDetails] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const { state } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ partySize });
    console.log({ bookingTime });

    const postObject = {
      title: `Booked by ${state.user?.user_display_name}`,
      content: details,
      acf: {
        party_size: partySize,
        booking_date: bookingDate,
        booking_time: bookingTime,
      },
      status: "publish",
    };

    const user = JSON.parse(sessionStorage.getItem("wpJWTUser") || "{}");

    try {
      const response = await axios.post(
        "http://wp-jwt-win.local/wp-json/wp/v2/bookings",
        postObject,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      // alert(error.message);
    }
  };

  return (
    <Container FULL={false} className="" pageTitle="More Info Page">
      <form onSubmit={handleSubmit} className="form-control">
        <label className="label">
          <span className="label-text">Party Size</span>
        </label>
        <select
          className="select select-bordered"
          onChange={(e) => setPartySize(Number(e.target.value))}
        >
          {[...Array(5)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} Person{i !== 0 && "s"}
            </option>
          ))}
        </select>

        <label className="label">
          <span className="label-text">Booking Date</span>
        </label>
        <input
          type="date"
          className="input input-primary"
          onChange={(e) => setBookingDate(e.target.value)}
        />

        <label className="label">
          <span className="label-text">Booking Time</span>
        </label>
        <select
          className="select select-bordered"
          onChange={(e) => setBookingTime(e.target.value)}
        >
          <option>Select Time</option>
          {Array.from({ length: 16 }, (_, i) => (8 + i) % 12 || 12).map(
            (time) => (
              <option
                key={time}
                value={`${time}:00 ${time > 12 ? "AM" : "PM"}`}
              >
                {time}:00 {time > 12 ? "AM" : "PM"}
              </option>
            )
          )}
        </select>
        <label className="label">
          <span className="label-text">Post Details</span>
        </label>
        <textarea
          placeholder="Post Details"
          className="textarea textarea-bordered mb-3"
          onChange={(e) => setDetails(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default BookingPage;
