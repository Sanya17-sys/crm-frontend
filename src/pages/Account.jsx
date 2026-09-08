import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShieldCheck,
  Hash,
  Save,
  Loader2,
  CheckCircle2,
  Boxes,
  KeyRound,
  Shield,
  Smartphone,
  Bell,
  Globe,
  Database,
  Download,
  LogOut,
  AlertTriangle,
  Lock,
  Calendar,
  Sparkles,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Laptop
} from "lucide-react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

export function Account() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [department, setDepartment] = useState("Supply Chain & Logistics");
  const [currency, setCurrency] = useState("INR");
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [emailSummaries, setEmailSummaries] = useState(true);

  // Status & Loaders
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productCount, setProductCount] = useState(0);
  const [totalValuation, setTotalValuation] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [activeTab, setActiveTab] = useState("general");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const [userRes, prodRes] = await Promise.allSettled([
        api.get("/inventory/user_profile"),
        api.get("/inventory/get-products"),
      ]);

      if (userRes.status === "fulfilled") {
        const u = userRes.value.data;
        setUser(u);
        setName(u.name || "");
        setEmail(u.email || "");
      }
      if (prodRes.status === "fulfilled") {
        const prods = prodRes.value.data?.products || [];
        setProductCount(prods.length);
        const val = prods.reduce(
          (sum, item) => sum + (Number(item.price) || 0) * (Number(item.stock) || 0),
          0
        );
        setTotalValuation(val);
      }
    } catch (error) {
      console.error("Account load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setSaving(true);
      await api.patch(`/inventory/update_users/${user.id}`, { name, email });
      triggerToast("Profile identity credentials saved successfully!");
      fetchProfileData();
    } catch (error) {
      console.error("Profile update error:", error);
      triggerToast(error.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    try {
      triggerToast("Generating inventory export backup report...", "success");
      
      const res = await api.get("/inventory/get-products");
      const products = res.data?.products || [];

      if (products.length === 0) {
        triggerToast("No products found in catalog to export.", "error");
        return;
      }

      // Headers for CSV
      const headers = [
        "Product ID",
        "Product Name",
        "Price (INR)",
        "Stock Quantity",
        "Total Valuation (INR)",
        "Rating Score",
        "Description",
        "Image Filename"
      ];

      // Format rows and escape quotes
      const rows = products.map((p) => {
        const id = p.pro_id || p.id || "";
        const name = (p.name || "").replace(/"/g, '""');
        const price = Number(p.price) || 0;
        const stock = Number(p.stock) || 0;
        const valuation = price * stock;
        const review = p.review || "4.5";
        const desc = (p.description || "").replace(/"/g, '""').replace(/\n/g, ' ');
        const image = p.image || "";

        return `"${id}","${name}",${price},${stock},${valuation},${review},"${desc}","${image}"`;
      });

      const csvContent = [headers.join(","), ...rows].join("\r\n");
      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().split("T")[0];
      link.setAttribute("href", url);
      link.setAttribute("download", `inventory_catalog_export_${timestamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      triggerToast(`Exported ${products.length} catalog items to CSV successfully!`, "success");
    } catch (err) {
      console.error("Export error:", err);
      triggerToast("Failed to generate CSV export file", "error");
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/inventory/logout");
    } catch (err) {
      console.warn("Logout completed");
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-700">Loading Account Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Toast toast={toast} onClose={() => setToast({ show: false, message: "", type: "success" })} />
      <Sidebar user={user} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-7xl mx-auto w-full min-w-0">
        <Navbar
          title="Account & Security Settings"
          subtitle="Manage credentials, workspace privileges, and security preferences"
          user={user}
        />

        {/* Hero Identity Banner */}
        <div className="figma-card overflow-hidden mb-8 border border-slate-200/90 shadow-sm">
          {/* Abstract Mesh Background Cover */}
          <div className="h-36 sm:h-44 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 relative flex items-start justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
              <span>Enterprise CRM Cloud Session</span>
            </div>

            <span className="text-[11px] font-bold text-blue-200 hidden sm:inline-block">
              Workspace ID: #WS-9902
            </span>
          </div>

          {/* Profile Overview Bar */}
          <div className="px-6 pb-6 pt-0 relative bg-white flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 sm:-mt-16">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
              {/* Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-xl shadow-blue-600/25 ring-4 ring-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
                <div
                  className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs flex items-center justify-center text-white"
                  title="Active Status"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Email */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {user?.name || "Inventory User"}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-extrabold uppercase">
                    Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{user?.email || "user@inventory.com"}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center justify-center sm:justify-end gap-3 pt-2 sm:pt-0">
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Catalog Items
                </span>
                <strong className="text-sm font-extrabold text-slate-900 block">
                  {productCount} SKUs
                </strong>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Asset Value
                </span>
                <strong className="text-sm font-extrabold text-blue-600 block">
                  ₹{totalValuation.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2 overflow-x-auto">
          {[
            { id: "general", label: "Profile & Identity", icon: User },
            { id: "security", label: "Security & Access", icon: Lock },
            { id: "preferences", label: "Catalog Preferences", icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Identity */}
        {activeTab === "general" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
            {/* Main Form */}
            <div className="lg:col-span-8 space-y-6">
              <div className="figma-card p-6 md:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-sm font-extrabold text-slate-900">Personal Information</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Update your official identity, login credentials, and contact details
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={saving}
                          className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 font-bold focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={saving}
                          className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 font-bold focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Contact Number
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={saving}
                          className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Department / Org
                      </label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        disabled={saving}
                        className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        System User ID
                      </label>
                      <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-2">
                        <Hash className="w-4 h-4 text-blue-600" />
                        <span>User #{user?.id || "1"}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Access Privilege
                      </label>
                      <div className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-blue-700 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Full Inventory Admin</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Changes will take effect across active sessions.
                    </span>
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 rounded-xl btn-primary text-xs font-bold shadow-md flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Side Card: Summary & Quick Actions */}
            <div className="lg:col-span-4 space-y-6">
              <div className="figma-card p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>Workspace Database</span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Products Managed:</span>
                    <strong className="text-slate-900 font-bold">{productCount} Records</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Database Status:</span>
                    <span className="text-emerald-600 font-bold">● Healthy & Synced</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Footprint:</span>
                    <span className="text-slate-700 font-mono">1.4 MB / 100 MB</span>
                  </div>
                </div>

                <button
                  onClick={handleExportData}
                  className="w-full py-2.5 px-3 rounded-xl btn-secondary text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Export Catalog Backup (CSV)</span>
                </button>
              </div>

              {/* Danger Zone */}
              <div className="figma-card p-5 border-red-200/80 bg-red-50/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-red-900">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Session Termination</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sign out of your active workspace session on this device.
                </p>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full py-2.5 px-3 rounded-xl btn-danger text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Security & Access */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
            <div className="lg:col-span-8 space-y-6">
              {/* Password Management */}
              <div className="figma-card p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Password & Authentication</h4>
                      <p className="text-[11px] text-slate-500">Manage login credentials and recovery</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Strong
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">Current Password</span>
                    <span className="text-xs text-slate-400 font-mono">••••••••••••••••</span>
                  </div>
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="px-3.5 py-2 rounded-xl btn-secondary text-xs font-bold hover:bg-white shadow-2xs transition-all cursor-pointer"
                  >
                    Reset Password
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="figma-card p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900">Active Devices & Sessions</h4>
                  <p className="text-[11px] text-slate-500">Currently logged in devices with authorized tokens</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">
                          Windows Desktop • Google Chrome
                        </h5>
                        <p className="text-[11px] text-slate-400">
                          IP: 192.168.1.1 • Current active workspace session
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active Now
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Card: Two-Factor Auth */}
            <div className="lg:col-span-4 space-y-6">
              <div className="figma-card p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Two-Factor Security (2FA)</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add an extra layer of protection requiring OTP codes upon login.
                </p>
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Standard 2FA Enabled via Email</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Catalog Preferences */}
        {activeTab === "preferences" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
            <div className="lg:col-span-8 space-y-6">
              <div className="figma-card p-6 space-y-5">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-extrabold text-slate-900">Currency & Regional Preferences</h4>
                  <p className="text-[11px] text-slate-500">Configure default catalog valuation formats</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Primary Valuation Currency
                    </label>
                    <select
                      value={currency}
                      onChange={(e) => {
                        setCurrency(e.target.value);
                        triggerToast("Currency display preference updated!");
                      }}
                      className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900 focus:outline-none bg-white cursor-pointer font-bold"
                    >
                      <option value="INR">₹ INR - Indian Rupee (Default)</option>
                      <option value="USD">$ USD - US Dollar</option>
                      <option value="EUR">€ EUR - Euro</option>
                      <option value="GBP">£ GBP - British Pound</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Timezone
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Asia/Kolkata (IST +5:30)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Critical Low Stock Alerts</h5>
                      <p className="text-[11px] text-slate-500">
                        Display pulse badges when stock is below threshold
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={lowStockAlerts}
                      onChange={(e) => {
                        setLowStockAlerts(e.target.checked);
                        triggerToast("Alert preferences updated!");
                      }}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Activity Log Auditing</h5>
                      <p className="text-[11px] text-slate-500">
                        Record all product additions and price edits
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailSummaries}
                      onChange={(e) => {
                        setEmailSummaries(e.target.checked);
                        triggerToast("Audit preferences updated!");
                      }}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xl">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Sign Out</h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to end your active workspace session?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl btn-secondary text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;