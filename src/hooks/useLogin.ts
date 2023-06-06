import { useState } from "react";
import { wp } from "../services/apiClient";
import { User } from "../constants";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

// JWT AUTH LOGIN FUNCTION IS BEING CREATED USING WP REST API ROOT ROUTE
wp.login = wp.registerRoute("jwt-auth/v1", "/token");

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  async function getUserIdBySlug(slug: string): Promise<number | null> {
    const response = await axios.get(
      `http://wp-jwt-win.local/wp-json/wp/v2/users?slug=${slug}`
    );

    if (response.data && response.data.length > 0 && response.data[0].id) {
      return response.data[0].id;
    }

    return null;
  }

  const login = async (username: string, password: string): Promise<User> => {
    let user: User = {
      token: "",
      user_email: "",
      user_nicename: "",
      user_display_name: "",
    };

    setIsLoading(true);

    try {
      user = await wp
        .login()
        .create(`username=${username}&password=${password}`, (res: User) => {});
      // console.log("TOKEN: ", user.token);
      if (user.token) {
        dispatch({ type: "LOGIN", payload: user });
      }

      if (user?.user_nicename) {
        const userId = await getUserIdBySlug(user.user_nicename);

        if (userId !== null) {
          sessionStorage.setItem("wpJWTUserId", userId.toString());
        }
      }

      sessionStorage.setItem("wpJWTUser", JSON.stringify(user));
    } catch (e) {
      setError("Username or Password maybe incorrect!");
    } finally {
      setIsLoading(false);
    }

    console.log("User:", user);
    return user;
  };

  return { login, error, setError, isLoading };
};
