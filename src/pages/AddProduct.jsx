import React, { useState, useEffect, useId } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  PackagePlus,
  UploadCloud,
  X,
  Loader2,
  Layers,
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Boxes,
  Tag,
  DollarSign,
  Sparkles,
  RefreshCw,
  Eye,
  ShieldCheck,
  Building2,
  Barcode,
  TrendingUp,
  Percent,
  Warehouse,
  Check,
  FileText,
  Maximize2
} from "lucide-react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

export function AddProduct({ onSuccess, onClose, isModal = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Core Product States
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stock, setStock] = useState("");
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [warehouseLocation, setWarehouseLocation] = useState("Main Warehouse (WH-A1)");
  const [review, setReview] = useState("4.8");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("Featured, New Arrival");

  // Media States
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomPreview, setZoomPreview] = useState(false);

  // App & Request States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const isModalMode = Boolean(isModal || onClose);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/inventory/user_profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user profile:", err);
      }
    };
    if (!isModalMode) {
      fetchUser();
    }
  }, [isModalMode]);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  // Helper to generate SKU
  const generateSku = () => {
    const prefix = category ? category.substring(0, 3).toUpperCase() : "PRD";
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `${prefix}-${randomNum}-X`;
    setSku(code);
  };

  // Image Handlers
  const handleFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }
    setErrorMsg("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Quick Demo Templates
  const handleFillTemplate = (type) => {
    if (type === "switch") {
      setName("Enterprise Managed 48-Port PoE+ Gigabit Switch");
      setCategory("Networking");
      setBrand("Cisco Systems");
      setSku("NET-4800-POE");
      setPrice("42999");
      setCostPrice("31500");
      setComparePrice("49999");
      setStock("35");
      setLowStockThreshold("8");
      setWarehouseLocation("Rack Bay 04 - Server Room");
      setReview("4.9");
      setDescription(
        "High-performance Layer-3 managed rackmount network switch with 48 Gigabit Ethernet ports, 4x 10G SFP+ uplink slots, 740W total PoE budget, and enterprise cloud management interface.\n\n• 48x RJ-45 Gigabit PoE+ Ports\n• 4x 10Gb SFP+ Uplinks\n• 740W PoE Power Capacity\n• Dual Hot-Swappable Power Supplies\n• 3-Year Advanced Hardware Warranty"
      );
      setTags("Networking, Enterprise, PoE+, Rackmount");
    } else if (type === "laptop") {
      setName("Precision Pro Ultra 16\" Studio Workstation");
      setCategory("Electronics");
      setBrand("Dell Technologies");
      setSku("LT-9600-PRO");
      setPrice("149999");
      setCostPrice("118000");
      setComparePrice("169999");
      setStock("18");
      setLowStockThreshold("5");
      setWarehouseLocation("High-Value Vault Sec-B");
      setReview("4.8");
      setDescription(
        "Flagship professional creator workstation laptop featuring 16-inch 4K OLED HDR display, 14th Gen Intel Core i9 processor, 64GB DDR5 RAM, and NVIDIA RTX 4080 GPU.\n\n• 16-inch 4K OLED 120Hz Touch Display\n• Intel Core i9-14900HX Processor\n• 64GB DDR5 5600MHz RAM\n• 2TB NVMe PCIe Gen4 SSD\n• NVIDIA GeForce RTX 4080 12GB GDDR6"
      );
      setTags("Laptop, High-End, OLED, Workstation");
    } else if (type === "keyboard") {
      setName("ErgoWave Wireless Mechanical Workspace Keyboard");
      setCategory("Peripherals");
      setBrand("Logitech");
      setSku("PER-7820-W");
      setPrice("8499");
      setCostPrice("5200");
      setComparePrice("9999");
      setStock("72");
      setLowStockThreshold("15");
      setWarehouseLocation("Aisle 3 - Peripherals Shelf 2");
      setReview("4.7");
      setDescription(
        "Ergonomic split-curved mechanical wireless keyboard designed for all-day typing comfort with whisper-quiet tactile switches and multi-device Bluetooth connectivity.\n\n• Cushioned Wrist Rest with Memory Foam\n• Tactile Quiet Mechanical Switches\n• Multi-Device Easy-Switch (Up to 3 Devices)\n• Rechargeable USB-C (Up to 4 Months Battery)"
      );
      setTags("Accessories, Ergonomic, Wireless, Mechanical");
    }
    triggerToast("Sample product template loaded!");
  };

  // Insert description snippet helper
  const insertDescriptionSnippet = (snippetType) => {
    let snippet = "";
    if (snippetType === "specs") {
      snippet = "\n\nSpecifications:\n- Dimensions: \n- Weight: \n- Material: \n- Connectivity: \n- Power Input: ";
    } else if (snippetType === "warranty") {
      snippet = "\n\nWarranty & Support:\n- 2-Year Official Manufacturer Limited Warranty\n- 30-Day Hassle-free replacement policy\n- 24/7 Enterprise customer helpdesk";
    } else if (snippetType === "features") {
      snippet = "\n\nKey Highlights:\n✓ High-durability enterprise build\n✓ Energy Star & RoHS certified\n✓ Plug-and-play instant deployment";
    }
    setDescription((prev) => prev + snippet);
  };

  const handleResetForm = () => {
    setName("");
    setCategory("Electronics");
    setBrand("");
    setSku("");
    setPrice("");
    setCostPrice("");
    setComparePrice("");
    setStock("");
    setLowStockThreshold("10");
    setWarehouseLocation("Main Warehouse (WH-A1)");
    setReview("4.8");
    setDescription("");
    setTags("");
    setImage(null);
    setPreview(null);
    setErrorMsg("");
  };

  // Calculate profit and margin
  const numPrice = parseFloat(price) || 0;
  const numCost = parseFloat(costPrice) || 0;
  const numStock = parseInt(stock, 10) || 0;
  const profit = numPrice > numCost && numCost > 0 ? (numPrice - numCost).toFixed(2) : null;
  const marginPercent = numPrice > 0 && profit ? (((numPrice - numCost) / numPrice) * 100).toFixed(1) : null;
  const totalValuation = (numPrice * numStock).toLocaleString("en-IN");

  // Completeness score
  const completenessChecks = [
    { label: "Product Title", filled: Boolean(name.trim()), weight: 25 },
    { label: "Selling Price", filled: Boolean(price && numPrice > 0), weight: 25 },
    { label: "Stock Quantity", filled: Boolean(stock && numStock >= 0), weight: 20 },
    { label: "Product Image", filled: Boolean(preview), weight: 15 },
    { label: "Description & Specs", filled: Boolean(description.trim()), weight: 15 },
  ];
  const completenessScore = completenessChecks.reduce(
    (sum, item) => (item.filled ? sum + item.weight : sum),
    0
  );

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter a valid product name.");
      return;
    }
    if (!price || numPrice <= 0) {
      setErrorMsg("Please enter a valid unit selling price.");
      return;
    }
    if (stock === "" || numStock < 0) {
      setErrorMsg("Please enter a valid initial stock quantity.");
      return;
    }

    try {
      setLoading(true);

      // Assemble rich description with SKU / Brand / Category metadata if present
      let formattedDescription = description.trim();
      const metaParts = [];
      if (sku) metaParts.push(`SKU: ${sku}`);
      if (brand) metaParts.push(`Brand: ${brand}`);
      if (category) metaParts.push(`Category: ${category}`);
      if (warehouseLocation) metaParts.push(`Location: ${warehouseLocation}`);

      // If metadata exists, prepend subtly if not already mentioned
      if (metaParts.length > 0 && !formattedDescription.includes(sku)) {
        formattedDescription = `[${metaParts.join(" | ")}]\n\n${formattedDescription}`;
      }

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("price", price);
      formData.append("description", formattedDescription || "Standard catalog product");
      formData.append("stock", stock);
      formData.append("review", review || "4.5");
      if (image) {
        formData.append("image", image);
      }

      await api.post("/inventory/add-products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (onSuccess) {
        onSuccess("Product added successfully to inventory!");
      } else {
        triggerToast("Product successfully published to inventory catalog!");
        setTimeout(() => {
          navigate("/products");
        }, 1100);
      }
    } catch (error) {
      console.error("Add product error:", error);
      setErrorMsg(
        error.response?.data?.message ||
        error.message ||
        "Failed to save product. Please verify your inputs and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Stock Badge Status
  const getStockStatusBadge = () => {
    if (stock === "" || isNaN(numStock)) {
      return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">Not Set</span>;
    }
    if (numStock === 0) {
      return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">Out of Stock</span>;
    }
    if (numStock <= parseInt(lowStockThreshold || "5", 10)) {
      return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Low Stock Alert</span>;
    }
    return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">In Stock Ready</span>;
  };

  const formBody = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Alert if error */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div className="flex-1 font-semibold">{errorMsg}</div>
          <button
            type="button"
            onClick={() => setErrorMsg("")}
            className="text-red-500 hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Quick Template Fill Bar */}
      <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 p-3.5 rounded-2xl border border-blue-100 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
          <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
          <span>Quick Autofill Templates:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleFillTemplate("switch")}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-700 text-[11px] font-bold shadow-2xs transition-all"
          >
            🔌 48-Port Switch
          </button>
          <button
            type="button"
            onClick={() => handleFillTemplate("laptop")}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-700 text-[11px] font-bold shadow-2xs transition-all"
          >
            💻 Pro Workstation
          </button>
          <button
            type="button"
            onClick={() => handleFillTemplate("keyboard")}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-700 text-[11px] font-bold shadow-2xs transition-all"
          >
            ⌨️ Ergo Keyboard
          </button>
          <button
            type="button"
            onClick={handleResetForm}
            className="px-2.5 py-1.5 rounded-xl hover:bg-slate-200 text-slate-500 text-[11px] font-medium transition-colors"
            title="Clear Form"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields (7 or 8 Cols) */}
        <div className={isModalMode ? "space-y-6" : "lg:col-span-8 space-y-6"}>

          {/* Card 1: Basic Information */}
          <div className="figma-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">General Information</h3>
                  <p className="text-[11px] text-slate-500">Core identifier, category, and classification</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">* Required</span>
            </div>

            {/* Product Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Product Title / Name *
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  {name.length}/120 characters
                </span>
              </div>
              <input
                type="text"
                maxLength={120}
                placeholder="e.g. Cisco Catalyst 48-Port Gigabit PoE+ Managed Switch"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Category & Brand */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900 focus:outline-none bg-white cursor-pointer"
                >
                  <option value="Electronics">📱 Electronics & Devices</option>
                  <option value="Networking">🌐 Networking & Infrastructure</option>
                  <option value="Peripherals">⌨️ Peripherals & Cables</option>
                  <option value="Hardware">🔩 Hardware & Components</option>
                  <option value="Office">📂 Office Supplies</option>
                  <option value="Furniture">🪑 Workspace Furniture</option>
                  <option value="Industrial">🏭 Industrial Tools</option>
                  <option value="Other">📦 Other Equipment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Brand / Manufacturer
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Dell, Cisco, Logitech, HP"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SKU & Barcode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    SKU / Item Code
                  </label>
                  <button
                    type="button"
                    onClick={generateSku}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Auto-Gen
                  </button>
                </div>
                <div className="relative">
                  <Barcode className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. NET-9201-X"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Storage Location / Bin
                </label>
                <div className="relative">
                  <Warehouse className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Main Warehouse (Bay A-12)"
                    value={warehouseLocation}
                    onChange={(e) => setWarehouseLocation(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Product Description & Technical Specifications
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 mr-1">Insert Template:</span>
                  <button
                    type="button"
                    onClick={() => insertDescriptionSnippet("specs")}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                  >
                    + Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => insertDescriptionSnippet("features")}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                  >
                    + Highlights
                  </button>
                  <button
                    type="button"
                    onClick={() => insertDescriptionSnippet("warranty")}
                    className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-700"
                  >
                    + Warranty
                  </button>
                </div>
              </div>
              <textarea
                rows={5}
                placeholder="Comprehensive description, dimensions, features, power ratings, and warranty policy..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none resize-y leading-relaxed font-sans"
              />
            </div>
          </div>

          {/* Card 2: Media & Image Upload */}
          <div className="figma-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs border border-indigo-100">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Product Media & Gallery</h3>
                  <p className="text-[11px] text-slate-500">Showcase high-resolution product photos</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">JPG, PNG, WEBP</span>
            </div>

            <div className="relative">
              {preview ? (
                <div className="relative h-64 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-950/5 flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Product preview"
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Floating Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-2xs opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setZoomPreview(true)}
                      className="p-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-lg font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105"
                      title="Zoom full image"
                    >
                      <Maximize2 className="w-4 h-4 text-blue-600" />
                      <span>Zoom</span>
                    </button>
                    <label
                      htmlFor="product-image-replace"
                      className="p-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-105"
                      title="Replace image"
                    >
                      <UploadCloud className="w-4 h-4 text-indigo-600" />
                      <span>Change</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreview(null);
                      }}
                      className="p-3 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="product-image-file-input"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 ${isDragging
                    ? "border-blue-500 bg-blue-50/70 scale-[1.01]"
                    : "border-slate-300 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20"
                    }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 shadow-xs">
                    <UploadCloud className="w-6 h-6 animate-bounce" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">
                    Click to browse or Drag & Drop product image here
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1">
                    Supports high-resolution PNG, JPG, or WEBP (Max 5MB)
                  </span>
                  <span className="mt-3 px-3 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-600 shadow-2xs">
                    Select File from Device
                  </span>
                </label>
              )}

              <input
                id="product-image-file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <input
                id="product-image-replace"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
            </div>
          </div>

          {/* Card 3: Pricing, Costs & Margins */}
          <div className="figma-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-100">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Pricing & Commercials</h3>
                  <p className="text-[11px] text-slate-500">Set sales price, cost price, and calculate margins</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">INR (₹)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Selling Price */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Unit Selling Price (₹) *
                </label>
                <div className="relative">
                  <span className="text-slate-400 font-bold absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="2999"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-8 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 font-bold placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cost Price */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Cost / Base Price (₹)
                </label>
                <div className="relative">
                  <span className="text-slate-400 font-bold absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="1800"
                    value={costPrice}
                    onChange={(e) => setCostPrice(e.target.value)}
                    disabled={loading}
                    className="w-full pl-8 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Compare Price */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  MRP / Compare Price (₹)
                </label>
                <div className="relative">
                  <span className="text-slate-400 font-bold absolute left-3.5 top-1/2 -translate-y-1/2 text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="3499"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                    disabled={loading}
                    className="w-full pl-8 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Profit Margin Info Box */}
            {profit && (
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Estimated Profit per Unit: ₹{profit}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-[11px]">
                  {marginPercent}% Margin
                </span>
              </div>
            )}
          </div>

          {/* Card 4: Inventory & Stock Control */}
          <div className="figma-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs border border-amber-100">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Inventory & Stock Tracking</h3>
                  <p className="text-[11px] text-slate-500">Control quantity thresholds and live availability status</p>
                </div>
              </div>
              <div>{getStockStatusBadge()}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Initial Stock */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Initial Stock Quantity *
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0"
                    placeholder="50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 font-bold placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Low Stock Threshold */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Low-Stock Alert Trigger
                </label>
                <div className="relative">
                  <AlertCircle className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="1"
                    placeholder="10"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Rating and Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Rating Score (0 to 5.0)
                  </label>
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= Math.round(parseFloat(review) || 0)
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300"
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <Star className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.8"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                  Tags (Comma Separated)
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Bestseller, 2026 Edition, High-Speed"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl figma-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Card Preview & Completeness (4 Cols) */}
        {!isModalMode && (
          <div className="lg:col-span-4 space-y-6">
            {/* Widget 1: Live Catalog Card Preview */}
            <div className="figma-card p-5 sticky top-24 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Live Catalog Preview
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  Real-time
                </span>
              </div>

              {/* Mock Product Card rendered as in Catalog */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Image / Thumbnail */}
                <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt={name || "Product"}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <Boxes className="w-10 h-10 mb-2 opacity-50 text-slate-400" />
                      <span className="text-[11px] font-semibold">Image Preview Will Appear Here</span>
                    </div>
                  )}

                  {/* Stock Status Badge */}
                  <div className="absolute top-3 left-3">
                    {getStockStatusBadge()}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-700 shadow-2xs border border-slate-200/60">
                    {category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{brand || "Brand/Maker"}</span>
                    <span className="font-mono text-[10px]">{sku || "NO-SKU"}</span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {name || "Untitled Product Record"}
                  </h4>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    </div>
                    <span className="font-bold text-slate-800 text-xs">
                      {parseFloat(review || "0").toFixed(1)}
                    </span>
                    <span className="text-slate-400 text-[11px]">• Verified Stock</span>
                  </div>

                  {/* Price & Valuation */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-extrabold text-blue-600">
                        ₹{numPrice ? numPrice.toLocaleString("en-IN") : "0"}
                      </span>
                      {comparePrice && parseFloat(comparePrice) > numPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2 font-medium">
                          ₹{parseFloat(comparePrice).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">
                      {numStock} in stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Widget 2: Completeness Checklist */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Form Completeness</span>
                  <span className="text-blue-600 font-extrabold">{completenessScore}%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
                    style={{ width: `${completenessScore}%` }}
                  />
                </div>
                <div className="space-y-1.5 pt-1">
                  {completenessChecks.map((chk, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[11px] font-medium"
                    >
                      <span className={chk.filled ? "text-slate-700 font-semibold" : "text-slate-400"}>
                        {chk.label}
                      </span>
                      {chk.filled ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                      ) : (
                        <span className="text-[10px] text-amber-600 font-bold">+ {chk.weight}%</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Financial Summary */}
              {numStock > 0 && numPrice > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500 font-medium">
                    <span>Stock Asset Value:</span>
                    <strong className="text-slate-900 font-extrabold">₹{totalValuation}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 font-medium">
                    <span>Location:</span>
                    <span className="text-slate-700 truncate max-w-[140px]">
                      {warehouseLocation}
                    </span>
                  </div>
                </div>
              )}

              {/* Side CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl btn-primary text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing Item...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish to Inventory</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                navigate("/products");
              }
            }}
            className="py-3 px-5 rounded-xl btn-secondary text-xs font-bold hover:bg-slate-100 transition-all"
          >
            Cancel & Return
          </button>
          <button
            type="button"
            onClick={handleResetForm}
            className="hidden sm:inline-flex py-3 px-4 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-bold transition-all"
          >
            Reset Form
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="py-3.5 px-8 rounded-xl btn-primary text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Product...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Publish Product</span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );

  // If in Modal Mode: Render compact modal layout without duplicate Navbar or Sidebar
  if (isModalMode) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <Toast toast={toast} onClose={() => setToast({ show: false, message: "", type: "success" })} />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-2xs">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Add New Product</h2>
              <p className="text-xs text-slate-500 font-medium">Quick entry for catalog stock inventory</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">{formBody}</div>
      </div>
    );
  }

  // Full Page Mode at /add-product
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Toast toast={toast} onClose={() => setToast({ show: false, message: "", type: "success" })} />
      <Sidebar user={user} />

      <main className="flex-1 md:ml-64 p-4 md:p-8 max-w-7xl mx-auto w-full min-w-0">
        <Navbar
          title="Add New Product"
          subtitle="Create, configure and publish a new item into your live catalog"
          user={user}
        />

        {/* Breadcrumbs & Status Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/profile" className="hover:text-slate-900 transition-colors">
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-slate-900 transition-colors">
              Catalog
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-bold">New Product</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
              <span>Back to Catalog</span>
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Active Workspace</span>
            </div>
          </div>
        </div>

        {/* Main Form Body */}
        {formBody}

        {/* Image Zoom Modal */}
        {zoomPreview && preview && (
          <div
            onClick={() => setZoomPreview(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
          >
            <button
              onClick={() => setZoomPreview(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-md"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={preview}
              alt="Zoomed Product"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default AddProduct;