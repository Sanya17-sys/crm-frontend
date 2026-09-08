import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  PlusCircle,
  AlertCircle,
  User,
  LogOut,
  Boxes,
  LayoutDashboard,
  ChevronDown,
  PackageCheck,
  Search,
  CheckCircle2,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

export function Navbar({
  title,
  subtitle,
  user,
  onAddProductClick,
  lowStockCount = 0,
  badge = null
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Dropdown States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const notifRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/inventory/logout");
    } catch (err) {
      console.warn("Logout request finished");
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
      <header className="relative z-20 bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-md shadow-slate-900/5 rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-all pl-14 md:pl-6 ring-1 ring-slate-900/5">
        {/* Left: Title, Subtitle & Live Status */}
        <div className="flex-1 min-w-0 pr-2 sm:pr-4">
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <h1 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 tracking-tight truncate">
              {title}
            </h1>
            {badge && (
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/70 shadow-2xs">
                {badge}
              </span>
            )}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-700 text-[10px] font-bold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Sync</span>
            </div>
          </div>
          {subtitle && (
            <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right: Quick Search, Actions, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 justify-end">
          
          {/* Quick Search Shortcut to Catalog */}
          {location.pathname !== "/products" && (
            <button
              onClick={() => navigate("/products")}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-400 hover:text-slate-700 text-xs font-medium transition-all shadow-2xs cursor-pointer group"
              title="Search catalog"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-[11px]">Search items...</span>
              <kbd className="px-1.5 py-0.2 rounded bg-white border border-slate-200 text-[9px] font-mono text-slate-500">
                /
              </kbd>
            </button>
          )}

          {/* Low Stock Alert Button */}
          {lowStockCount > 0 && (
            <button
              onClick={() => navigate("/products?filter=low")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl badge-red text-xs font-bold hover:bg-red-100/90 transition-all animate-pulse shadow-2xs cursor-pointer"
              title={`${lowStockCount} items running low on stock`}
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline">{lowStockCount} Critical</span>
              <span className="xs:hidden">{lowStockCount}</span>
            </button>
          )}

          {/* Add Item Action CTA */}
          {location.pathname !== "/add-product" && (
            <button
              onClick={() => {
                if (onAddProductClick) {
                  onAddProductClick();
                } else {
                  navigate("/add-product");
                }
              }}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}

          {/* Notification Center */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 transition-all shadow-2xs cursor-pointer ${
                showNotifications
                  ? "ring-2 ring-blue-500/20 border-blue-400 bg-blue-50/40 text-blue-600"
                  : ""
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {lowStockCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white animate-ping" />
              )}
              {lowStockCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
              )}
            </button>

            {/* Notifications Popover Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-88 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-slate-900/5">
                <div className="px-4 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-extrabold text-slate-900">Notifications</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {lowStockCount > 0 ? `${lowStockCount} Unresolved` : "Up to date"}
                  </span>
                </div>

                <div className="max-h-72 overflow-y-auto py-1">
                  {lowStockCount > 0 ? (
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/products?filter=low");
                      }}
                      className="px-4 py-3 hover:bg-red-50/60 cursor-pointer transition-colors border-b border-slate-50 flex items-start gap-3"
                    >
                      <div className="p-2 rounded-xl bg-red-100 text-red-600 mt-0.5">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-xs font-bold text-slate-900">Low Stock Alert</h5>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {lowStockCount} product{lowStockCount > 1 ? "s" : ""} have fallen below safety limits.
                        </p>
                        <span className="text-[10px] font-bold text-red-600 mt-1 inline-block">
                          Restock items now →
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 mt-0.5">
                      <PackageCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xs font-bold text-slate-900">Live Inventory Cloud</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Database is connected with zero latency.
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 mt-1 inline-block">
                        Active & Synced
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate("/products");
                    }}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800"
                  >
                    Open Catalog Management →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2.5 p-1 pr-2.5 sm:pr-3 rounded-full border border-slate-200/90 bg-white/90 hover:bg-slate-50 transition-all shadow-2xs cursor-pointer group ${
                showUserMenu ? "ring-2 ring-blue-500/20 border-blue-400 bg-blue-50/40" : ""
              }`}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-xs ring-2 ring-white group-hover:scale-105 transition-transform">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-none truncate max-w-[120px]">
                  {user?.name || "Inventory User"}
                </p>
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 hidden sm:inline-block transition-transform" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl py-2.5 z-50 animate-in fade-in slide-in-from-top-2 ring-1 ring-slate-900/5">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-slate-900 truncate">
                        {user?.name || "Inventory User"}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {user?.email || "user@inventory.com"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/account");
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/profile");
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    <span>Dashboard Overview</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      navigate("/products");
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 transition-colors"
                  >
                    <Boxes className="w-4 h-4 text-slate-400" />
                    <span>Inventory Catalog</span>
                  </button>
                </div>

                <div className="pt-1.5 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

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
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
