import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
import axios, { AxiosResponse } from "axios";

import logoLight from "/images/logo/logo_black.png"; // Light mode logo
import logoDark from "/images/logo/logo_white.png"; // Dark mode logo

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type for form data
interface SignUpFormData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

// Type for backend response
interface ApiResponse {
  message: string;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [isChecked, setIsChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const res: AxiosResponse<ApiResponse> = await axios.post(`${API_BASE_URL}/api/auth/signup`,
        {
          name: `${formData.fname} ${formData.lname}`,
          email: formData.email,
          password: formData.password,
        }
      );
      alert(res.data.message);
      navigate("/signin");
    } catch (err: any) {
      alert(err.response?.data?.message || "Sign Up Failed");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
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
                   <h1 className="mb-2 font-semibold dark:text-white">Sign UP</h1>
                 </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

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
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                     {showPassword ? <EyeIcon  className="fill-gray-500 dark:fill-gray-400 w-5 h-5" /> : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />}
                  </span>
                </div>
              </div>

          

              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-3 text-white bg-black dark:bg-white dark:text-black rounded-lg"
                >
                  Sign Up
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
    </div>
  );
}
