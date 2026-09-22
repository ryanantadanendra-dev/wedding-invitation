"use client";

import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default Login;
