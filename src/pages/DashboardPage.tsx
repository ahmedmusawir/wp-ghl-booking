import { useNavigate } from "react-router-dom";
import { Container, Row, Box } from "../components/layouts";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useBookings from "../hooks/useBookings";
import parse from "html-react-parser";
import Spinner from "../components/Spinner";

const DashboardPage = () => {
  const { data: bookings, error, isLoading } = useBookings();
  const { state } = useAuthContext();
  const navigate = useNavigate();

  console.log("Bookings via RQ:", bookings);

  useEffect(() => {
    // REDIRECTING THE USER TO HOME PAGE IF THE USER IS NOT LOGGED IN
    console.log("Auth in Dashboard", state.authIsReady);
    if (!state.authIsReady) {
      navigate("/");
    }
  }, []);
  return (
    <Container className={""} FULL={false} pageTitle={"Home"}>
      <Row className={"prose"}>
        <h1 className="h1">User Dashboard</h1>
        <div className="">
          <h3>Name: {state.user?.user_nicename}</h3>
          <h3>Email: {state.user?.user_email}</h3>
        </div>
        <hr />
      </Row>
      <Row className={"grid gap-3 grid-auto-fit p-3"}>
        {isLoading && <Spinner />}
        {!isLoading &&
          bookings?.map((booking) => (
            <div className="card w-full bg-base-100 shadow-xl" key={booking.id}>
              <figure>
                <img src="https://picsum.photos/id/63/350/80" alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{booking.title.rendered}</h2>
                <p>
                  <b>Booking Date:</b> {parse(booking.acf.booking_date)}
                </p>
                <p>
                  <b>Booking Time:</b> {parse(booking.acf.booking_time)}
                </p>
                <p>
                  <b>Party Size:</b> {booking.acf.party_size}
                </p>
                <span>
                  <b>Description:</b>
                  {parse(booking.content.rendered)}
                </span>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Update Booking</button>
                </div>
              </div>
            </div>
          ))}
      </Row>
    </Container>
  );
};

export default DashboardPage;
