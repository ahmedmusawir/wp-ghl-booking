export const API_URL_LOCAL_WIN_WP = "http://wp-jwt-win.local/wp-json";
export const API_URL_WIN_VM = "http://jwtwp.local/wp-json";
export const CACHE_KEY_BOOKINGS = ["bookings"];

export interface User {
  token?: string;
  user_email?: string;
  user_nicename?: string;
  user_display_name?: string;
}

export interface Booking {
  id: number;
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  acf: {
    party_size: number;
    booking_date: string;
    booking_time: string;
  };
  author_name: "nihad";
}
