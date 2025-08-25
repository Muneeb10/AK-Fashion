import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import axios from "axios";
import logoLight from "/images/logo/logo_black.png"; // Light mode logo
import logoDark from "/images/logo/logo_white.png"; // Dark mode logo

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface SignInFormData {
  email: string;
  password: string;
}

interface SignInResponse {
  message: string;
  token: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<SignInResponse>(`${API_BASE_URL}/api/auth/signin`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Sign In Failed");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-5 text-center sm:mb-8">
          <img
            src={logoLight} // default light mode
            alt="Logo"
            className="mx-auto mb-4 h-20 w-auto block dark:hidden" // visible in light mode
          />
          <img
            src={logoDark} // dark mode version
            alt="Logo"
            className="mx-auto mb-4 h-20 w-auto hidden dark:block" // visible in dark mode
          />
          <h1 className="mb-2 font-semibold dark:text-white">Sign In</h1>
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
                value={formData.email}
                onChange={handleChange}
                placeholder="info@gmail.com"
              />
            </div>

            {/* Password */}
            <div>
              <Label>
                Password<span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeIcon  className="fill-gray-500 dark:fill-gray-400 w-5 h-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full px-4 mt-3 py-3 text-white bg-black dark:bg-white dark:text-gray-900 rounded-lg transition-colors hover:opacity-90"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>

        {/* Forgot password */}
        <div className="mt-5 text-center">
          <Link
            to="/forget-password"
            className="text-sm text-brand-500 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
