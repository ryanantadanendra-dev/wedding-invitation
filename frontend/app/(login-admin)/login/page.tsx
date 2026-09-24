"use client";

import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { user } = useAuth({ middleware: "auth" });

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Login;
