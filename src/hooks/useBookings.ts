import { Booking, CACHE_KEY_BOOKINGS } from "../constants";
import { useQuery } from "@tanstack/react-query";
import bookingService from "../services/bookingService";

const useBookings = () =>
  useQuery<Booking[], Error>({
    queryKey: CACHE_KEY_BOOKINGS,
    queryFn: () =>
      bookingService.getAll().then(
        // This line sorts your todos by id in descending order.
        (todos) => todos.sort((a, b) => b.id - a.id).slice(0, 10)
      ),
    staleTime: 10 * 1000,
  });

export default useBookings;
