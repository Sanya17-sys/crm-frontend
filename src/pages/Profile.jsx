import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Boxes,
  User,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  X,
  AlertCircle,
} from "lucide-react";
import api, { API_BASE_URL } from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

export function Profile() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLowStockAlert, setShowLowStockAlert] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const emailTriggered = useRef(false);
  const navigate = useNavigate();

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [profileRes, productRes, activityRes] = await Promise.allSettled([
        api.get("/inventory/user_profile"),
        api.get("/inventory/get-products"),
        api.get("/inventory/activity"),
      ]);

      if (profileRes.status === "fulfilled") {
        setUser(profileRes.value.data);
      }

      let fetchedProducts = [];
      if (productRes.status === "fulfilled") {
        fetchedProducts = productRes.value.data?.products || [];
        setProducts(fetchedProducts);
      }

      if (activityRes.status === "fulfilled") {
        setActivities(activityRes.value.data?.activities || []);
      }

      const lowStockItems = fetchedProducts.filter((p) => Number(p?.stock) <= 5);
      if (lowStockItems.length > 0 && !emailTriggered.current) {
        emailTriggered.current = true;
        api.post("/inventory/send-low-stock-alert").catch((err) => {
          console.warn("Low stock alert notice:", err.message);
        });
      }
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => Number(p.stock) > 10).length;
  const lowStockCount = products.filter(
    (p) => Number(p.stock) > 0 && Number(p.stock) <= 10
  ).length;
  const outOfStockCount = products.filter((p) => Number(p.stock) === 0).length;

  const totalInventoryValue = products.reduce(
    (sum, p) => sum + Number(p.price || 0) * Number(p.stock || 0),
    0
  );

  const criticalProducts = products.filter((p) => Number(p.stock) <= 5);

  const formatCurrency = (val) => {
    const num = Number(val || 0);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} Lakh`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(2)} K`;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-700">Loading Dashboard Workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Toast toast={toast} onClose={() => setToast({ show: false, message: "", type: "success" })} />
      <Sidebar user={user} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-7xl mx-auto w-full min-w-0">
        <Navbar
          title={`Welcome back, ${user?.name || "User"} 👋`}
          subtitle="Real-time stock valuation & inventory overview"
          user={user}
          lowStockCount={criticalProducts.length}
        />

        {/* Red Alert Banner for Critical Stock */}
        {showLowStockAlert && criticalProducts.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between gap-4 animate-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-red-100 text-red-600">
                <AlertCircle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-red-900">
                  Critical Alert: {criticalProducts.length} Products in Low Stock
                </h4>
                <p className="text-[11px] text-red-700 font-medium mt-0.5">
                  Items like {criticalProducts.slice(0, 2).map((p) => p.name).join(", ")} require restocking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/products?filter=low")}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-xs transition-colors"
              >
                View Items
              </button>
              <button
                onClick={() => setShowLowStockAlert(false)}
                className="p-1.5 rounded-lg hover:bg-red-100 text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Valuation Hero Card (Royal Blue) */}
          <div className="bg-blue-600 text-white p-5 rounded-2xl relative overflow-hidden shadow-md shadow-blue-600/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                Valuation
              </span>
              <div className="p-2.5 rounded-xl bg-white/20 text-white">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {formatCurrency(totalInventoryValue)}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold opacity-90 mt-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Active Assets</span>
            </div>
          </div>

          {/* Total Catalog */}
          <div className="figma-card p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Total Products
              </span>
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{totalProducts}</h3>
            <p className="text-[11px] text-slate-500 font-medium mt-2">SKU Catalog</p>
          </div>

          {/* In Stock (Green) */}
          <div className="figma-card p-5 relative overflow-hidden bg-emerald-50/50 border-emerald-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                In Stock
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-emerald-700 tracking-tight">{inStockCount}</h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-2">Healthy Supply</p>
          </div>

          {/* Low Stock (Blue Tint) */}
          <div className="figma-card p-5 relative overflow-hidden bg-blue-50/50 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                Low Stock
              </span>
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-blue-700 tracking-tight">{lowStockCount}</h3>
            <p className="text-[11px] text-blue-600 font-bold mt-2">Needs Restocking</p>
          </div>

          {/* Out of Stock (Red Tint) */}
          <div className="figma-card p-5 relative overflow-hidden bg-red-50/50 border-red-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider">
                Out of Stock
              </span>
              <div className="p-2.5 rounded-xl bg-red-100 text-red-700">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-red-700 tracking-tight">{outOfStockCount}</h3>
            <p className="text-[11px] text-red-600 font-bold mt-2">Zero Stock</p>
          </div>
        </div>

        {/* Stock Breakdown Meter */}
        {totalProducts > 0 && (
          <div className="figma-card p-5 mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-2">
              <span>Inventory Supply Health</span>
              <span className="text-slate-500">{totalProducts} Total Catalog SKUs</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(inStockCount / totalProducts) * 100}%` }}
                className="bg-emerald-500 transition-all duration-500"
                title={`In Stock: ${inStockCount}`}
              />
              <div
                style={{ width: `${(lowStockCount / totalProducts) * 100}%` }}
                className="bg-blue-600 transition-all duration-500"
                title={`Low Stock: ${lowStockCount}`}
              />
              <div
                style={{ width: `${(outOfStockCount / totalProducts) * 100}%` }}
                className="bg-red-600 transition-all duration-500"
                title={`Out of Stock: ${outOfStockCount}`}
              />
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> In Stock ({inStockCount})
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Low Stock ({lowStockCount})
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" /> Out of Stock ({outOfStockCount})
              </div>
            </div>
          </div>
        )}

        {/* Quick Controls + Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Controls</h3>

            <div
              onClick={() => navigate("/add-product")}
              className="figma-card p-4 flex items-center gap-4 cursor-pointer group hover:border-blue-500 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Add New Product
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Create new inventory item</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>

            <div
              onClick={() => navigate("/products")}
              className="figma-card p-4 flex items-center gap-4 cursor-pointer group hover:border-blue-500 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Boxes className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Manage Catalog
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Search, edit & filter stock</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>

            <div
              onClick={() => navigate("/account")}
              className="figma-card p-4 flex items-center gap-4 cursor-pointer group hover:border-blue-500 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Account Settings
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">Update account profile</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-2 figma-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" /> Recent Audit Events
              </h3>
              <span className="text-xs font-bold text-slate-500">{activities.length} Recorded</span>
            </div>

            <div className="flex-1 space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {activities.length > 0 ? (
                activities.map((act) => (
                  <div
                    key={act.activity_id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1.5 rounded-lg bg-white border border-slate-200 text-sm shadow-2xs">
                        {act.action === "PRODUCT_ADDED" && "➕"}
                        {act.action === "PRODUCT_UPDATED" && "♻️"}
                        {act.action === "PRODUCT_DELETED" && "🗑️"}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900">{act.product_name}</p>
                        <span className="text-[10px] font-bold text-slate-500 font-mono">
                          {act.action.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs font-medium">
                  No activity recorded yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Products Data Table */}
        <div className="figma-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Catalog Additions</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Top products in active stock</p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                  <th className="pb-3 px-3">Product Name</th>
                  <th className="pb-3 px-3">Unit Price</th>
                  <th className="pb-3 px-3">Stock Quantity</th>
                  <th className="pb-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400">
                      <span>No products added yet. </span>
                      <button
                        onClick={() => navigate("/add-product")}
                        className="text-blue-600 font-bold hover:underline cursor-pointer ml-1 inline-flex items-center gap-1"
                      >
                        + Add Product
                      </button>
                    </td>
                  </tr>
                ) : (
                  products.slice(0, 5).map((prod) => {
                    const imgUrl = prod.image ? `${API_BASE_URL}/uploads/${prod.image}` : null;
                    const stockNum = Number(prod.stock);

                    let badgeClass = "badge-green";
                    let statusLabel = "In Stock";

                    if (stockNum === 0) {
                      badgeClass = "badge-red";
                      statusLabel = "Out of Stock";
                    } else if (stockNum <= 10) {
                      badgeClass = "badge-blue";
                      statusLabel = "Low Stock";
                    }

                    return (
                      <tr key={prod.pro_id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt={prod.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : (
                                <Boxes className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <span className="font-bold text-slate-900">{prod.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          ₹{Number(prod.price || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 font-mono">{prod.stock} units</td>
                        <td className="py-3 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
