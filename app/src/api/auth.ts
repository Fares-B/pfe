import query from "./query";

interface LoginBodyProps {
  email: string;
  password: string;
}

interface RegisterBodyProps {
  email: string;
  password: string;
  username: string;
}

interface ForgotPasswordBodyProps {
  email: string;
}

interface ResetPasswordBodyProps {
  email: string;
  code: string;
  password: string;
}


export const loginRequest = async (body: LoginBodyProps) => query("/login", "POST", body);

export const registerRequest = async (body: RegisterBodyProps) => query("/register", "POST", body);

export const forgotPasswordRequest = async (body: ForgotPasswordBodyProps) => query("/forgot-password", "POST", body);

export const resetPasswordRequest = async (body: ResetPasswordBodyProps) => query("/reset-password", "POST", body);
