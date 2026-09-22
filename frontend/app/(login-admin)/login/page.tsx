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
import LoginForm from "@/components/LoginForm";

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
      <LoginForm />
    </Suspense>
  );
};

export default Login;
