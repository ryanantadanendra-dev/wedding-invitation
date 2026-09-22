import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { ValidationErrors } from "@/types/auth";

export type useAuthProp = {
  middleware?: "guest" | "auth";
  redirectIfAuthenticated?: string;
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: useAuthProp) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response?.status !== 401) throw error;
        return null;
      }),
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  type loginProp = {
    email: string;
    password: string;
    setErrors: Dispatch<SetStateAction<ValidationErrors>>;
    setStatus: Dispatch<SetStateAction<string | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };

  const login = async ({
    setErrors,
    setStatus,
    setIsLoading,
    ...props
  }: loginProp) => {
    await csrf();

    setErrors({});
    setStatus(null);
    setIsLoading(true);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error?.response?.status !== 422) throw error;

        setErrors(error.response.data.errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
    } catch (e) {
      // ignore error, redirect anyway
    } finally {
      mutate(null);
      window.location.pathname = "/login";
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    // if (middleware === 'auth' && user && !user.email_verified_at)
    //     router.push('/verify-email')

    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};
