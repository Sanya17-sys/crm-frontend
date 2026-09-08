import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  KeyRound,
  AlertCircle,
  Boxes,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle
} from "lucide-react";
import api from "../api/api";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [devResetLink, setDevResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await api.post("/inventory/forgot-password", { email });
      setSuccessMsg(res.data.message || "Password reset link processed successfully. Please check your inbox.");
      if (res.data.resetLink) {
        setDevResetLink(res.data.resetLink);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrorMsg(error.response?.data?.message || "Failed to request password reset link. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-50 text-slate-900 flex selection:bg-blue-600 selection:text-white font-sans">
      
      {/* LEFT COLUMN: HERO SECURITY SHOWCASE */}
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
                  Account Recovery
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Secure Link Verification
              </span>
            </div>
          </Link>
        </div>

        {/* Central Benefit Card */}
        <div className="relative z-10 my-auto space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Fast Automated Account Recovery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Lost Your Access? We've Got You Covered.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Enter the work email associated with your InventoryPro CRM. We will generate a secure, one-time time-limited password recovery link.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3 animate-float">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-200">How Recovery Works</span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950 border border-blue-800/80 px-2 py-0.5 rounded-full font-bold">
                15-Min Expiry
              </span>
            </div>

            <ol className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">1</span>
                <span>Submit your registered company email below</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">2</span>
                <span>Receive an encrypted cryptographic recovery link</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">3</span>
                <span>Set your new password and regain instant workspace access</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Encrypted Token Delivery</span>
          </div>
          <span>Bcrypt Protection</span>
        </div>

      </div>

      {/* RIGHT COLUMN: FORGOT FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 relative overflow-y-auto">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between w-full max-w-md mx-auto">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs hover:shadow-sm transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>

          <Link
            to="/"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Home Portal
          </Link>
        </div>

        {/* Central Auth Box */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Reset Password 🔑
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
              Enter your email address to receive reset instructions.
            </p>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="font-bold leading-relaxed">{successMsg}</div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1 font-bold">{errorMsg}</div>
            </div>
          )}

          {/* Dev Mode Link Notice */}
          {devResetLink && (
            <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-mono break-all animate-in fade-in space-y-1">
              <div className="font-bold text-blue-700">🔑 [Dev Mode Link]:</div>
              <a href={devResetLink} className="underline hover:text-blue-950 font-bold block">{devResetLink}</a>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Registered Work Email
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Dispatching Recovery Link...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Reset Instructions</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 font-medium max-w-md mx-auto">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Sign In here
          </Link>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;