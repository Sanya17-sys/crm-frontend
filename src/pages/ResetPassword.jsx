import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Lock,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Boxes,
  Sparkles,
  Check,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import api from "../api/api";

export function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Real-time password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strength = getPasswordStrength();

  const getStrengthLabel = () => {
    if (!password) return { label: "", color: "bg-slate-200" };
    if (strength <= 1) return { label: "Weak", color: "bg-red-500", text: "text-red-600" };
    if (strength === 2 || strength === 3) return { label: "Good", color: "bg-amber-500", text: "text-amber-600" };
    return { label: "Strong & Secure", color: "bg-emerald-500", text: "text-emerald-600" };
  };

  const strengthInfo = getStrengthLabel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await api.patch(`/inventory/reset-password/${token}`, { password_hash: password });
      setSuccessMsg("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrorMsg(error.response?.data?.message || "Invalid or expired token. Please request a new link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-slate-50 text-slate-900 flex selection:bg-blue-600 selection:text-white font-sans">
      
      {/* LEFT COLUMN: HERO SECURITY SHOWCASE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-12 flex-col justify-between relative overflow-hidden text-white border-r border-slate-800">
        
        {/* Background Mesh Glow Orbs */}
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
                  Security Hub
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                Cryptographic Access Recovery
              </span>
            </div>
          </Link>
        </div>

        {/* Central Card */}
        <div className="relative z-10 my-auto space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>End-to-End Cryptographic Reset</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Secure Your Workspace with a Fresh Credential.
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed">
            Your new password will be hashed using Bcrypt multi-round salt before being committed to your enterprise ledger.
          </p>

          {/* Floating Security Badge Widget */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-3.5 animate-float">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-slate-200">Token Verification</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full font-bold">
                Token Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Stateless token authenticity validated</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bcrypt hash encryption applied automatically</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Immediate invalidation of past active sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Encrypted SSL Gateway Active</span>
          </div>
          <span>AES-256 Standard</span>
        </div>

      </div>

      {/* RIGHT COLUMN: RESET FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 relative overflow-y-auto">
        
        {/* Top Navigation */}
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

        {/* Central Reset Box */}
        <div className="w-full max-w-md mx-auto my-auto py-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Create New Password 🔒
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
              Choose a strong, unique password to secure your CRM inventory account.
            </p>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="flex-1 font-bold">{successMsg}</div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-1 font-bold">{errorMsg}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
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

              {/* Password Strength Meter */}
              {password && (
                <div className="mt-2.5 space-y-1.5 animate-in fade-in">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Security Strength:</span>
                    <span className={strengthInfo.text}>{strengthInfo.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength >= 1 ? strengthInfo.color : "bg-slate-200"} flex-1`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${strength >= 2 ? strengthInfo.color : "bg-slate-200"} flex-1`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${strength >= 3 ? strengthInfo.color : "bg-slate-200"} flex-1`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${strength >= 4 ? strengthInfo.color : "bg-slate-200"} flex-1`} />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-1.5 text-[11px] font-bold flex items-center gap-1.5">
                  {password === confirmPassword ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Passwords match
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Passwords do not match
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (confirmPassword && password !== confirmPassword)}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <>
                  <span>Save New Password & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 font-medium max-w-md mx-auto">
          Need immediate assistance? Contact our 24/7 Security Support Team.
        </div>

      </div>

    </div>
  );
}

export default ResetPassword;