import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Boxes,
  User,
  Mail,
  Lock,
  KeyRound,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Shield,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  Star,
  Sparkles,
  ArrowLeft,
  Check,
  RotateCcw
} from "lucide-react";
import api from "../api/api";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await api.post("/inventory/send-otp", {
        name,
        email,
        password_hash,
      });

      setShowOtpField(true);
    } catch (error) {
      console.error("Send OTP error:", error);
      setErrorMessage(error.response?.data?.message || "Failed to send verification OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await api.post("/inventory/verify-otp", {
        email,
        otp,
      });

      navigate("/login?registered=true");
    } catch (error) {
      console.error("Verify OTP error:", error);
      setErrorMessage(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-50 text-slate-900 flex selection:bg-blue-600 selection:text-white font-sans">
      
      {/* LEFT COLUMN: HERO MARKETING SHOWCASE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-12 flex-col justify-between relative overflow-hidden text-white border-r border-slate-800">
        
        {/* Background Decorative Blur Orbs */}
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

        {/* Central Benefits Showcase */}
        <div className="relative z-10 my-auto space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>14-Day Free Enterprise Trial</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Join 10,000+ Fast-Growing Modern Brands.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Stop losing revenue to stockouts. Get intelligent safety thresholds, automated valuation ledgers, and seamless multi-warehouse controls in under 60 seconds.
          </p>

          {/* Feature Checklist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200">
                Unlimited SKU tracking & catalog image uploads
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200">
                Live asset valuation calculations & profit margins
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200">
                Automated email OTP security & bcrypt encryption
              </span>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Instant Setup — No Credit Card Needed</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>AES-256 Grade</span>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: SIGNUP & OTP FORM */}
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
            to="/login"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Already registered? <span className="underline">Sign in</span>
          </Link>
        </div>

        {/* Central Auth Box */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          
          {/* Header Title */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 mb-4 lg:hidden">
              {showOtpField ? <Shield className="w-6 h-6" /> : <Boxes className="w-6 h-6" />}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {showOtpField ? "Verify OTP Code 🔑" : "Create Workspace 🚀"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
              {showOtpField
                ? `Enter the 6-digit verification code sent to ${email}`
                : "Set up your InventoryPro account in less than a minute."}
            </p>
          </div>

          {/* Red Error Alert Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1 font-bold">{errorMessage}</div>
            </div>
          )}


          {/* Registration Form */}
          <form onSubmit={showOtpField ? handleVerifyOtp : handleSignup} className="space-y-4">
            {!showOtpField ? (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="At least 6 characters"
                      value={password_hash}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Security OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            ) : (
              /* OTP VERIFICATION STEP */
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Enter 6-Digit OTP Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      disabled={loading}
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl figma-input text-sm font-mono tracking-widest text-slate-900 placeholder-slate-400 focus:outline-none text-center font-bold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Complete Verification & Register</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowOtpField(false)}
                  className="w-full text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mt-2 text-center py-2 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to Registration Details</span>
                </button>
              </>
            )}
          </form>

        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 font-medium max-w-md mx-auto">
          By registering, you agree to our Terms of Service & Security Guidelines.
        </div>

      </div>

    </div>
  );
}

export default Signup;