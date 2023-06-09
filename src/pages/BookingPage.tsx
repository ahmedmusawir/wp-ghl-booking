import React, { useState } from "react";
import { Container, Row, Box } from "../components/layouts";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const BookingPage: React.FC = () => {
  const [details, setDetails] = useState("");
  const [partySize, setPartySize] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const { state } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpinning(true);

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
      setIsSpinning(false);
    } catch (error) {
      console.error("Error:", error);
      // alert(error.message);
    }
  };

  return (
    <Container FULL={false} className="prose" pageTitle="More Info Page">
      <h1>Make a Reservation</h1>
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
          {Array.from({ length: 16 }, (_, i) => 8 + i).map((hour) => {
            const period = hour >= 12 ? "PM" : "AM";
            const displayHour = hour > 12 ? hour - 12 : hour;
            return (
              <option key={hour} value={`${displayHour}:00 ${period}`}>
                {displayHour}:00 {period}
              </option>
            );
          })}
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

export default BookingPage;
