import { useState, ChangeEvent, FormEvent } from "react";
// import { useNavigate } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import axios from "axios";
import logoLight from "/images/logo/logo_black.png"; // Light mode logo
import logoDark from "/images/logo/logo_white.png"; // Dark mode logo
import { Link, useNavigate } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ForgotPasswordData {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export default function ForgotPasswordForm() {
  const [formData, setFormData] = useState<ForgotPasswordData>({ email: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      alert("Email is required");
      return;
    }

    try {
      const res = await axios.post<ForgotPasswordResponse>(`${API_BASE_URL}/api/auth/forgot-password`,
        { email: formData.email }
      );

      alert(res.data.message || "If this email exists, a reset link has been sent.");
      navigate("/signin");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-5 text-center sm:mb-8">
          <img
            src={logoLight}
            alt="Logo"
            className="mx-auto mb-4 h-20 w-auto block dark:hidden"
          />
          <img
            src={logoDark}
            alt="Logo"
            className="mx-auto mb-4 h-20 w-auto hidden dark:block"
          />
          <h1 className="mb-2 font-semibold dark:text-white">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your registered email to receive a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Email */}
            <div>
              <Label>
                Email<span className="text-error-500">*</span>
              </Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                // required
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full px-4 mt-3 py-3 text-white bg-black dark:bg-white dark:text-gray-900 rounded-lg transition-colors hover:opacity-90"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </form>
         <div className="mt-5 text-center">
           
            <Link to="/signin" className="text-brand-500">
              Sign In
            </Link>
          </div>
      </div>
    </div>
  );
}
