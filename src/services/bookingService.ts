import { Booking } from "../constants";
import APIClient from "../services/apiClient";

export default new APIClient<Booking>("wp/v2/bookings");
