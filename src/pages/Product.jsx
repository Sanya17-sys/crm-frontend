import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Star,
  X,
  Loader2,
  Image as ImageIcon,
  Boxes,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api, { API_BASE_URL } from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Zoom Image State
  const [selectedZoomImage, setSelectedZoomImage] = useState(null);

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Delete Modal
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  const fetchProductsAndUser = async () => {
    try {
      setLoading(true);
      const [userRes, prodRes] = await Promise.allSettled([
        api.get("/inventory/user_profile"),
        api.get("/inventory/get-products"),
      ]);

      if (userRes.status === "fulfilled") {
        setUser(userRes.value.data);
      }
      if (prodRes.status === "fulfilled") {
        setProducts(prodRes.value.data?.products || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndUser();

    if (searchParams.get("add") === "true") {
      navigate("/add-product");
    }
    if (searchParams.get("filter")) {
      setStockFilter(searchParams.get("filter"));
    }
  }, [searchParams, navigate]);

  // Edit Submit
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      setUpdating(true);
      await api.patch(`/inventory/update/${editingProduct.pro_id}`, {
        name: editingProduct.name,
        price: editingProduct.price,
        stock: editingProduct.stock,
        description: editingProduct.description,
        review: editingProduct.review,
      });

      setShowEditModal(false);
      setEditingProduct(null);
      triggerToast("Product updated successfully!");
      fetchProductsAndUser();
    } catch (error) {
      console.error("Update error:", error);
      triggerToast(error.response?.data?.message || "Failed to update product", "error");
    } finally {
      setUpdating(false);
    }
  };

  // Delete Submit (Red Action)
  const handleDeleteProduct = async () => {
    if (!deleteProduct) return;

    try {
      setDeleting(true);
      await api.delete(`/inventory/delete/${deleteProduct.pro_id}`);

      setDeleteProduct(null);
      triggerToast("Product deleted from catalog", "error");
      fetchProductsAndUser();
    } catch (error) {
      console.error("Delete error:", error);
      triggerToast(error.response?.data?.message || "Failed to delete product", "error");
    } finally {
      setDeleting(false);
    }
  };

  // Filter & Sort
  const filteredProducts = products
    .filter((p) => {
      const matchSearch = (p.name || "").toLowerCase().includes(searchTerm.toLowerCase());
      const stockNum = Number(p.stock);

      if (!matchSearch) return false;
      if (stockFilter === "instock") return stockNum > 10;
      if (stockFilter === "low") return stockNum > 0 && stockNum <= 10;
      if (stockFilter === "out") return stockNum === 0;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
      if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
      if (sortBy === "stock-asc") return Number(a.stock) - Number(b.stock);
      return (a.name || "").localeCompare(b.name || "");
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const lowStockCount = products.filter((p) => Number(p.stock) <= 5).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Toast toast={toast} onClose={() => setToast({ show: false, message: "", type: "success" })} />
      <Sidebar user={user} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-7xl mx-auto w-full min-w-0">
        <Navbar
          title="Catalog Inventory"
          subtitle="Manage, search, edit and remove stock items"
          user={user}
          lowStockCount={lowStockCount}
        />

        {/* Toolbar */}
        <div className="figma-card p-4 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product catalog..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills & Sort */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto justify-start sm:justify-end">
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "instock", label: "In Stock" },
                { id: "low", label: "Low Stock" },
                { id: "out", label: "Out of Stock" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setStockFilter(f.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    stockFilter === f.id
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer pr-2"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock-asc">Stock: Low to High</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "table" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Catalog Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="figma-card p-4 rounded-2xl h-80 skeleton" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="figma-card p-12 text-center max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Boxes className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Products</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              {searchTerm
                ? `No items found matching "${searchTerm}"`
                : "Your inventory is currently empty."}
            </p>
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 rounded-xl btn-secondary text-xs font-bold"
              >
                Clear Search Filter
              </button>
            ) : (
              <button
                onClick={() => navigate("/add-product")}
                className="px-5 py-2.5 rounded-xl btn-primary text-xs font-bold shadow-md"
              >
                + Add Product Now
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((prod) => {
              const imgUrl = prod.image ? `${API_BASE_URL}/uploads/${prod.image}` : null;
              const stockNum = Number(prod.stock);

              let badgeClass = "badge-green";
              let badgeText = "In Stock";

              if (stockNum === 0) {
                badgeClass = "badge-red";
                badgeText = "Out of Stock";
              } else if (stockNum <= 10) {
                badgeClass = "badge-blue";
                badgeText = "Low Stock";
              }

              return (
                <div key={prod.pro_id} className="figma-card overflow-hidden flex flex-col group relative">
                  {/* Image */}
                  <div className="relative h-48 bg-slate-100 border-b border-slate-200 overflow-hidden cursor-pointer">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={prod.name}
                        onClick={() => setSelectedZoomImage(imgUrl)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="w-10 h-10 mb-1" />
                        <span className="text-[10px] font-semibold">No Image</span>
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeClass}`}
                    >
                      {badgeText}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 min-h-[32px]">
                        {prod.description || "No description specified"}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Price</span>
                        <span className="text-base font-extrabold text-slate-900">
                          ₹{Number(prod.price || 0).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">Stock</span>
                        <span className={`text-xs font-bold ${stockNum <= 5 ? "text-red-600" : "text-slate-900"}`}>
                          {prod.stock} units
                        </span>
                      </div>
                    </div>

                    {/* Actions: Blue Edit & Red Delete */}
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-xs text-slate-600 font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        <span>{prod.review || "4.5"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Royal Blue Edit Button */}
                        <button
                          onClick={() => {
                            setEditingProduct({ ...prod });
                            setShowEditModal(true);
                          }}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white transition-all"
                          title="Edit Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Red Delete Button */}
                        <button
                          onClick={() => setDeleteProduct(prod)}
                          className="p-2 rounded-xl btn-danger transition-all"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="figma-card p-4 sm:p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                    <th className="pb-3 px-3">Product Name</th>
                    <th className="pb-3 px-3">Price</th>
                    <th className="pb-3 px-3">Stock</th>
                    <th className="pb-3 px-3">Rating</th>
                    <th className="pb-3 px-3">Status</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {paginatedProducts.map((prod) => {
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
                                <img src={imgUrl} alt={prod.name} className="w-full h-full object-cover" />
                              ) : (
                                <Boxes className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 block truncate max-w-[180px] sm:max-w-xs">{prod.name}</span>
                              <span className="text-[11px] text-slate-500 font-medium line-clamp-1">{prod.description || "—"}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          ₹{Number(prod.price || 0).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3 px-3 font-mono">{prod.stock}</td>
                        <td className="py-3 px-3 text-slate-900 font-bold">★ {prod.review || "4.5"}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Blue Edit */}
                            <button
                              onClick={() => {
                                setEditingProduct({ ...prod });
                                setShowEditModal(true);
                              }}
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white cursor-pointer"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            {/* Red Delete */}
                            <button
                              onClick={() => setDeleteProduct(prod)}
                              className="p-1.5 rounded-lg btn-danger cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 pt-4 text-center sm:text-left">
            <span className="text-xs font-semibold text-slate-500">
              Showing Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 rounded-xl btn-secondary text-xs font-bold flex items-center gap-1 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1.5 rounded-xl btn-secondary text-xs font-bold flex items-center gap-1 disabled:opacity-40 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div
          onClick={() => !updating && setShowEditModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto my-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-600" /> Edit Product Details
              </h3>
              <button
                disabled={updating}
                onClick={() => setShowEditModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingProduct.price || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Rating Score (0 - 5.0)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={editingProduct.review || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, review: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ""}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 rounded-xl btn-secondary text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-3 rounded-xl btn-primary text-xs font-bold shadow-md flex items-center justify-center gap-2"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Red Delete Confirmation Modal */}
      {deleteProduct && (
        <div
          onClick={() => !deleting && setDeleteProduct(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white p-6 rounded-2xl border border-slate-200 shadow-xl text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Delete Product Record?</h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              Are you sure you want to permanently remove <strong className="text-slate-900">{deleteProduct.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                disabled={deleting}
                onClick={() => setDeleteProduct(null)}
                className="flex-1 py-2.5 rounded-xl btn-secondary text-xs font-bold"
              >
                Cancel
              </button>
              {/* Prominent Red Action CTA */}
              <button
                disabled={deleting}
                onClick={handleDeleteProduct}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {selectedZoomImage && (
        <div
          onClick={() => setSelectedZoomImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
        >
          <button
            onClick={() => setSelectedZoomImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-md"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedZoomImage}
            alt="Preview Zoom"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Products;