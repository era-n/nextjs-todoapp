import { object, ref, string } from "yup";

export const RegSchema = object({
  username: string()
    .required("Username is required")
    .min(3, "Username must contain at least 3 letters"),
  email: string().required("Email is required").email("Invalid email"),
  password: string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 symbols or letters"),
});

export const LogInSchema = object({
  email: string().required("Email is required").email("Invalid email"),
  password: string().required("Password is required"),
});

export const ForgotPasswordSchema = object({
  email: string().email().lowercase().required("Email is required"),
});

export const ResetPasswordSchema = object({
  newPassword: string()
    .min(8, "Password must contain at least 8 symbols or letters")
    .required("*"),
  confirmNewPassword: string()
    .oneOf([ref("newPassword"), undefined], "Passwords don't match")
    .required("*"),
});

export const UserSchema = object({
  username: string().min(3).max(30).trim().required("Username is required"),
  email: string()
    .email("Invalid email")
    .lowercase()
    .required("Email is required"),
});
