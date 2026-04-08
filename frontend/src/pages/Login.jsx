import React, { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Package,
  Monitor,
  Building2,
  PcCase,
} from "lucide-react";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    // TODO: replace with actual auth API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0f14] font-['DM_Sans',sans-serif] relative overflow-hidden p-6">
      <div className="absolute w-130 h-130 rounded-full bg-blue-500 opacity-[0.18] blur-[80px] pointer-events-none -top-40 -left-28 animate-blob-drift" />
      <div className="absolute w-100 h-100 rounded-full bg-violet-500 opacity-[0.18] blur-[80px] pointer-events-none -bottom-24 -right-20 animate-blob-2" />
      <div className="absolute w-70 h-70 rounded-full bg-cyan-400 opacity-[0.18] blur-[80px] pointer-events-none top-1/2 left-1/2 animate-blob-drift-center" />

      <div className="relative z-10 flex w-full max-w-215 rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)] animate-card-in">
        <div className="brand-panel-bg hidden md:flex w-85 shrink-0 bg-linear-to-br from-blue-800 via-indigo-600 to-violet-700 px-10 py-12 flex-col relative overflow-hidden">
          <div className="w-13 h-13 mb-5 animate-icon-in">
            <PcCase size={48} color="white" />
          </div>

          <h1 className="font-['Syne',sans-serif] text-[2rem] font-extrabold text-white tracking-tight leading-none mb-1.5">
            LabTrack
          </h1>
          <p className="text-[0.78rem] text-white/55 tracking-widest uppercase font-medium mb-7">
            ICT Department · v1.0
          </p>

          <div className="h-px bg-white/15 mb-7" />

          <p className="text-[0.9rem] text-white/75 leading-relaxed mb-8">
            Manage computers, laboratories, and inventory — all in one place.
          </p>

          {/* Badges */}
          <div className="flex flex-col gap-2.5 mt-auto">
            {[
              { icon: <Package size={13} />, label: "Inventory" },
              { icon: <Monitor size={13} />, label: "Computers" },
              { icon: <Building2 size={13} />, label: "Laboratories" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/15 rounded-full text-[0.8rem] text-white/85 font-medium backdrop-blur-sm w-fit"
              >
                {icon} {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[#111318] px-11 py-12 flex flex-col justify-center">
          <div className="mb-9 animate-slide-up-1">
            <h2 className="font-['Syne',sans-serif] text-[1.7rem] font-bold text-slate-100 tracking-tight mb-1.5">
              Welcome back
            </h2>
            <p className="text-[0.88rem] text-slate-500">
              Sign in to your account to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 animate-slide-up-2"
          >
            <div
              className={`flex flex-col gap-1.5 ${errors.username ? "field-error" : ""}`}
            >
              <label
                htmlFor="username"
                className="text-[0.8rem] font-semibold text-slate-400 tracking-wider uppercase"
              >
                Username
              </label>
              <div className="input-group relative flex items-center">
                <span className="input-group-icon absolute left-3.5 text-slate-600 flex pointer-events-none transition-colors duration-200">
                  <User size={16} />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="e.g. john_doe"
                  value={form.username}
                  onChange={handleChange}
                  className="field-input w-full pl-10 pr-4 py-3 bg-[#1a1d26] border border-[#252836] rounded-[10px] text-slate-200 text-[0.9rem] outline-none transition-all duration-200 placeholder:text-gray-700 focus:border-blue-500 focus:bg-[#1e2130] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                />
              </div>
              {errors.username && (
                <span className="text-[0.76rem] text-red-400 flex items-center gap-1">
                  {errors.username}
                </span>
              )}
            </div>

            <div
              className={`flex flex-col gap-1.5 ${errors.password ? "field-error" : ""}`}
            >
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[0.8rem] font-semibold text-slate-400 tracking-wider uppercase"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-[0.78rem] text-blue-500 font-medium hover:text-blue-400 transition-colors duration-200 no-underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-group relative flex items-center">
                <span className="input-group-icon absolute left-3.5 text-slate-600 flex pointer-events-none transition-colors duration-200">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="field-input w-full pl-10 pr-10 py-3 bg-[#1a1d26] border border-[#252836] rounded-[10px] text-slate-200 text-[0.9rem] outline-none transition-all duration-200 placeholder:text-gray-700 focus:border-blue-500 focus:bg-[#1e2130] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 text-slate-600 hover:text-slate-400 flex p-0 bg-transparent border-none cursor-pointer transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-[0.76rem] text-red-400 flex items-center gap-1">
                  {errors.password}
                </span>
              )}
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span className="text-[0.85rem] text-slate-500">
                Remember me for 30 days
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-linear-to-br from-blue-600 to-indigo-600 rounded-[10px] text-white font-['Syne',sans-serif] text-[0.95rem] font-semibold tracking-wide cursor-pointer border-none shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all duration-200 hover:opacity-90 hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(59,130,246,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-7 text-[0.82rem] text-slate-600 text-center animate-slide-up-3">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="text-blue-500 font-medium hover:text-blue-400 transition-colors duration-200 no-underline"
            >
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
