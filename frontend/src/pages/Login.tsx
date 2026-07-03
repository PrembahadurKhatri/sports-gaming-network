import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import api from "../api/axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Login Successful!");
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
      >

        <div className="text-center">

          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-4xl text-white">
            ⚽
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to Sports & Gaming Network
          </p>

        </div>

        {/* Email */}

        <div className="mt-8">

          <label className="mb-2 block font-medium text-gray-700">
            Email
          </label>

          <div className="relative">

            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-black placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none"
              required
            />

          </div>

        </div>

        {/* Password */}

        <div className="mt-5">

          <label className="mb-2 block font-medium text-gray-700">
            Password
          </label>

          <div className="relative">

            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-12 text-black placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="mt-5 flex items-center justify-between text-sm">

          <label className="flex items-center gap-2 text-gray-600">
            <input type="checkbox" />
            Remember Me
          </label>

          <a
            href="#"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>

        </div>

        {/* Login */}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
         
            <a href="/player-registration" className=" text-cyan-500 hover:underline hover:text-cyan-700 ">
            Register
            </a>
        </p>

      </form>
    </div>
  );
}