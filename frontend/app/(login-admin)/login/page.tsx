"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useAuth } from "@/hooks/auth";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthSessionStatus from "../AuthSessionStatus";
import Image from "next/image";
import { Suspense } from "react";

// Bentuk error validasi dari Laravel: tiap field bisa punya beberapa pesan
type ValidationErrors = {
  email?: string[];
  password?: string[];
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = searchParams.get("reset");

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (reset && reset.length > 0 && Object.keys(errors).length === 0) {
      setStatus(atob(reset));
    } else {
      setStatus(null);
    }
  }, [reset, errors]);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({
      email,
      password,
      setErrors,
      setStatus,
      setIsLoading,
    });
  };

  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <div className="w-full md:w-100 px-7">
        <AuthSessionStatus className="mb-4" status={status} />
        <form onSubmit={submitForm} className="lg:mt-20 md:mt-12 mt-8">
          <h1 className="text-2xl font-bold">Login</h1>

          {/* Email Address */}
          <div className="mt-6">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
              required
              autoFocus
            />

            <InputError messages={errors.email} className="mt-2" />
          </div>

          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              required
              autoComplete="current-password"
            />

            <InputError messages={errors.password} className="mt-2" />
          </div>

          {/* Remember Me */}
          {/* <div className="block mt-4">
                    <label
                        htmlFor="remember_me"
                        className="inline-flex items-center">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={event =>
                                setShouldRemember(event.target.checked)
                            }
                        />

                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div> */}

          <div className="flex items-center justify-center mt-8">
            <Button type="submit" className="px-7 py-4 ">
              {isLoading ? "Loging In. . ." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </Suspense>
  );
};

export default Login;
