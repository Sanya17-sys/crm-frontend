import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, PackagePlus, Boxes, User, LogOut, ShieldCheck, X } from "lucide-react";
import api from "../api/api";

export function Sidebar({ user, onAddProductClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/profile",
    },
    {
      label: "My Products",
      icon: Boxes,
      path: "/products",
    },
    {
      label: "Add Product",
      icon: PackagePlus,
      path: "/add-product",
    },
    {
      label: "Account",
      icon: User,
      path: "/account",
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-white border border-slate-200 shadow-md text-slate-900 hover:bg-slate-50"
        aria-label="Toggle navigation"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Boxes className="w-5 h-5 text-blue-600" />}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20">
              <Boxes className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-900 tracking-tight">InventoryPro</h1>
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Enterprise CRM
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6">
            <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Main Menu
            </p>
            <nav className="space-y-1.5">
              {navItems.map((item, idx) => {
                const Icon = item.icon;
                const isActive = item.path && location.pathname === item.path;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setMobileOpen(false);
                      if (item.action) {
                        item.action();
                      } else if (item.path) {
                        navigate(item.path);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-900"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* User Card & Red Sign Out Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div
            onClick={() => navigate("/account")}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white cursor-pointer transition-colors group mb-3 border border-transparent hover:border-slate-200"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                {user?.name || "Inventory User"}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {user?.email || "user@inventory.com"}
              </p>
            </div>
          </div>

          {/* Red Sign Out Trigger */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold btn-danger transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
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

export default Sidebar;
