import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import axios from "axios";
import logoLight from "/images/logo/logo_black.png"; // Light mode logo
import logoDark from "/images/logo/logo_white.png"; // Dark mode logo

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  message: string;
}

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState<ResetPasswordData>({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { token } = useParams(); // Get token from URL

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post<ResetPasswordResponse>(`${API_BASE_URL}/api/auth/reset-password/${token}`,
        { password: formData.password }
      );

      alert(res.data.message || "Password reset successfully");
      navigate("/signin");
    } catch (err: any) {
      alert(err.response?.data?.message || "Reset Password Failed");
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
            Reset Password
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* New Password */}
            <div>
              <Label>
                New Password<span className="text-error-500">*</span>
              </Label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label>
                Confirm Password<span className="text-error-500">*</span>
              </Label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full px-4 mt-3 py-3 text-white bg-black dark:bg-white dark:text-gray-900 rounded-lg transition-colors hover:opacity-90"
              >
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
