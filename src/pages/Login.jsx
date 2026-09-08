import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import {
  Boxes,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Star,
  Sparkles,
  Layers,
  ArrowLeft
} from "lucide-react";
import api from "../api/api";

export function Login() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registeredSuccess = searchParams.get("registered") === "true";

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const cleanEmail = email.trim();
      const res = await api.post("/inventory/login", {
        email: cleanEmail,
        password_hash,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      } else {
        setErrorMessage("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please verify your credentials.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-50 text-slate-900 flex selection:bg-blue-600 selection:text-white font-sans">
      
      {/* LEFT COLUMN: HERO MARKETING SHOWCASE (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-12 flex-col justify-between relative overflow-hidden text-white border-r border-slate-800">
        
        {/* Background Mesh Gradients */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">
                  Inventory<span className="text-blue-500">Pro</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full">
                  CRM 2.0
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Enterprise Stock Ledger
              </span>
            </div>
          </Link>
        </div>

        {/* Central Visual Card Showcase */}
        <div className="relative z-10 my-auto space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI-Driven Stock Valuation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Real-Time Command Over Your Catalog.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Gain immediate visibility into warehouse inventory, auto-calculated margins, and instantaneous low-stock warnings.
          </p>

          {/* Mini Interactive Preview Card with Floating Animation */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-4 animate-float">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-slate-200">Active Warehouse Ledger</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full font-bold">
                Live (12ms)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Asset Valuation</div>
                <div className="text-lg font-black text-blue-400 mt-0.5">₹48,92,450</div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold mt-1">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span>+18.4% this quarter</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Catalog Items</div>
                <div className="text-lg font-black text-white mt-0.5">1,482 SKUs</div>
                <div className="text-[9px] text-slate-400 font-medium mt-1">
                  Across 6 categories
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial & Trust Quote Footer */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-300">4.9/5 by 10,000+ businesses</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Bank-grade JWT Auth</span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 relative overflow-y-auto">
        
        {/* Top Navbar Header */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/signup"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Don't have an account? <span className="underline">Sign up</span>
          </Link>
        </div>

        {/* Central Auth Box */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          
          {/* Header Title */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 mb-4 lg:hidden">
              <Boxes className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
              Enter your enterprise credentials to access your CRM ledger.
            </p>
          </div>

          {/* Registered Success Notice */}
          {registeredSuccess && !errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="flex-1 font-bold">
                Account verified successfully! Please sign in with your email and password.
              </div>
            </div>
          )}

          {/* Error Alert Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1 font-bold">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="alex.morgan@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Account Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your security password"
                  value={password_hash}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social / SSO Divider */}
          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-slate-50 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Protected by Enterprise Shield
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>JWT Stateless</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>OTP Encrypted</span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 font-medium max-w-md mx-auto">
          © {new Date().getFullYear()} InventoryPro CRM Inc. All rights reserved.
        </div>

      </div>

    </div>
  );
}

export default Login;