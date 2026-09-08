import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Boxes,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  BarChart3,
  Layers,
  Warehouse,
  TrendingUp,
  Sparkles,
  Lock,
  ChevronDown,
  Star,
  Check,
  HelpCircle,
  Users,
  DollarSign,
  PackagePlus,
  LayoutDashboard,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  Play,
  ArrowUpRight,
  Shield,
  Clock,
  Laptop,
  ArrowUp,
  ChevronUp,
  Activity,
  Award,
  Globe2,
  Cpu,
  Truck
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("catalog");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll listener for progress bar and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));

      if (totalScroll > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const featureTabs = [
    {
      id: "catalog",
      title: "Smart Catalog Management",
      icon: Layers,
      description: "Organize thousands of products with custom SKUs, categories, multi-pricing tiers, and auto-generated barcodes.",
      metrics: [
        { label: "Products Supported", val: "100,000+" },
        { label: "Search Latency", val: "< 15ms" },
      ],
      previewDetails: {
        heading: "Enterprise Catalog Hub",
        badge: "Auto-synced",
        items: [
          { name: "Quantum Pro Ultrabook 16\"", sku: "LAP-8902", price: "₹1,24,999", stock: "42 in stock", status: "Optimal" },
          { name: "Sony Alpha 7 IV Mirrorless", sku: "CAM-4421", price: "₹2,10,000", stock: "8 in stock", status: "Low Stock" },
          { name: "Logitech MX Master 3S", sku: "ACC-1029", price: "₹8,995", stock: "154 in stock", status: "Optimal" },
        ]
      }
    },
    {
      id: "stock",
      title: "Live Stock & Safety Triggers",
      icon: Bell,
      description: "Automated low-stock detection with real-time visual alerts to prevent costly stockouts before they occur.",
      metrics: [
        { label: "Stockout Prevention", val: "99.4%" },
        { label: "Notification Speed", val: "Instant" },
      ],
      previewDetails: {
        heading: "Automated Safety Thresholds",
        badge: "Critical Watch",
        items: [
          { name: "Dell 34\" Curved Monitor", sku: "MON-3420", price: "₹45,999", stock: "3 left", status: "Critical Alert" },
          { name: "Keychron Q1 Mechanical", sku: "KEY-0091", price: "₹14,499", stock: "5 left", status: "Low Stock" },
          { name: "Sony WH-1000XM5 ANC", sku: "AUD-9912", price: "₹26,990", stock: "24 in stock", status: "Optimal" },
        ]
      }
    },
    {
      id: "valuation",
      title: "Valuation & Profit Ledger",
      icon: TrendingUp,
      description: "Instant monetary valuation of your active assets with real-time margin tracking and cost-vs-revenue breakdowns.",
      metrics: [
        { label: "Valuation Accuracy", val: "100%" },
        { label: "Margin Visibility", val: "Live" },
      ],
      previewDetails: {
        heading: "Financial Ledger Intelligence",
        badge: "Real-time Math",
        items: [
          { name: "Total Asset Valuation", sku: "VAL-ACTIVE", price: "₹48,92,450", stock: "842 Units", status: "+18.4% MoM" },
          { name: "Projected Gross Margin", sku: "FIN-MARGIN", price: "34.2%", stock: "Healthy", status: "Profitable" },
          { name: "Dead Stock Risk", sku: "RISK-SCORE", price: "₹0.00", stock: "0 items", status: "Zero Risk" },
        ]
      }
    },
    {
      id: "security",
      title: "Enterprise Security & OTPs",
      icon: ShieldCheck,
      description: "Encrypted JWT sessions, multi-step OTP verifications, password hashes, and complete audit trail logs.",
      metrics: [
        { label: "Encryption Grade", val: "AES-256" },
        { label: "Auth SLA", val: "99.99%" },
      ],
      previewDetails: {
        heading: "Security & Access Controls",
        badge: "Active Shield",
        items: [
          { name: "Cryptographic OTP Auth", sku: "AUTH-OTP", price: "Verified", stock: "Active", status: "Secured" },
          { name: "Stateless JWT Auth Tokens", sku: "TOKEN-SEC", price: "Encrypted", stock: "Auto-refresh", status: "Valid" },
          { name: "Activity Ledger & Logs", sku: "AUDIT-LOG", price: "100% Tracked", stock: "Live", status: "Compliant" },
        ]
      }
    }
  ];

  const faqs = [
    {
      q: "How does InventoryPro simplify inventory tracking?",
      a: "InventoryPro gives you a centralized, real-time command center. You can manage product specifications, pricing, image uploads, safety stock thresholds, and live valuation in a single click with zero lag."
    },
    {
      q: "Can I receive alerts when stock falls below a certain limit?",
      a: "Yes! Every product has a customizable safety stock limit. When an item falls below its safety count, the system triggers instant visual warning badges and high-priority alerts on your dashboard."
    },
    {
      q: "Is my inventory and financial data secure?",
      a: "Absolutely. InventoryPro uses industry-standard JWT token authentication, secure OTP verification for registration, Bcrypt password hashing, and encrypted database connections."
    },
    {
      q: "Can I access InventoryPro on mobile and tablet devices?",
      a: "Yes, InventoryPro is fully responsive and optimized for desktops, tablets, and mobile smartphones with modern glassmorphism layouts and touch-friendly controls."
    },
    {
      q: "How fast can my team get started?",
      a: "Setup takes less than 60 seconds! Just register your account, verify your OTP, and immediately start adding products and organizing your catalog."
    }
  ];

  const partnerLogos = [
    { name: "Shopify Plus", type: "Commerce Engine" },
    { name: "Amazon FBA", type: "Logistics Sync" },
    { name: "Stripe Billing", type: "Payment Flow" },
    { name: "SAP S/4HANA", type: "Enterprise ERP" },
    { name: "BlueDart Express", type: "Courier Network" },
    { name: "Delhivery Freight", type: "Fulfillment Hub" },
    { name: "QuickBooks Pro", type: "Financial Sync" },
    { name: "WooCommerce", type: "Store Bridge" },
  ];

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* CUTE TOP SCROLL PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Decorative Gradients & Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-400/15 via-indigo-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-[800px] -left-40 w-[600px] h-[600px] bg-blue-500/5 blur-3xl rounded-full" />
        <div className="absolute top-[1600px] -right-40 w-[600px] h-[600px] bg-indigo-500/5 blur-3xl rounded-full" />
      </div>

      {/* STICKY GLASSMORPHIC NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Inventory<span className="text-blue-600">Pro</span>
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full">
                  CRM 2.0
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
                Enterprise Ledger
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#preview" className="hover:text-blue-600 transition-colors">Platform</a>
            <a href="#workflow" className="hover:text-blue-600 transition-colors">Workflows</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl border border-slate-200/90 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 bg-white border-b border-slate-200 space-y-3 animate-in slide-in-from-top-2">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-600"
            >
              Features
            </a>
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-600"
            >
              Platform
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-600"
            >
              Workflows
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-600"
            >
              Pricing
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-slate-700 hover:text-blue-600"
            >
              FAQ
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full py-2.5 text-center rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="w-full py-2.5 text-center rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-600/20"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 pb-16 md:pt-24 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Floating Pill Announcement */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold shadow-2xs mb-8 animate-in fade-in duration-500 hover:scale-105 transition-transform cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Next-Generation Inventory CRM 2.0</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
          <span className="font-extrabold text-blue-800">Live Sync</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight max-w-5xl mx-auto leading-[1.1] mb-6">
          Master Your Stock. <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            Accelerate Your Enterprise.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
          The all-in-one real-time inventory management CRM built for modern commerce. Track multi-warehouse stock, prevent stockouts with intelligent alerts, and maximize valuation with automated margin ledgering.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Start Free Trial — Zero Setup Fee</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/login"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm sm:text-base border border-slate-200/90 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Laptop className="w-4 h-4 text-blue-600" />
            <span>Open Demo Workspace</span>
          </Link>
        </div>

        {/* Social Proof & Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-500 pt-4 border-t border-slate-200/60 max-w-4xl mx-auto">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-900 font-extrabold">4.9/5</span>
            <span>(1,200+ Reviews)</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Bank-Grade AES-256 & OTP Auth</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span>Instant 60-Second Setup</span>
          </div>
        </div>

        {/* HERO INTERACTIVE APP SHOWCASE WITH CUTE FLOATING ANIMATION BADGES */}
        <div id="preview" className="mt-16 relative mx-auto max-w-6xl">
          
          {/* CUTE FLOATING BADGE 1: Top-Left Profit Margin */}
          <div className="hidden md:flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl absolute -top-5 left-4 sm:left-8 z-30 animate-float text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">+34.2% Gross Margin</div>
              <div className="text-[10px] font-bold text-emerald-600">₹18.4L Net Profit</div>
            </div>
          </div>

          {/* CUTE FLOATING BADGE 2: Top-Right Restock Warning */}
          <div className="hidden md:flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-red-200 shadow-2xl absolute -top-5 right-4 sm:right-8 z-30 animate-float-reverse text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center flex-shrink-0">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">Safety Restock Alert</div>
              <div className="text-[10px] font-bold text-red-600">2 Products Critical</div>
            </div>
          </div>

          {/* CUTE FLOATING BADGE 3: Bottom-Left Security Shield */}
          <div className="hidden lg:flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-blue-200 shadow-2xl absolute -bottom-5 left-4 sm:left-8 z-30 animate-float-slow text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center flex-shrink-0">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">AES-256 JWT Active</div>
              <div className="text-[10px] font-bold text-blue-600">Stateless Session Secure</div>
            </div>
          </div>

          {/* CUTE FLOATING BADGE 4: Bottom-Right Live Sync */}
          <div className="hidden lg:flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl absolute -bottom-5 right-4 sm:right-8 z-30 animate-float text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">Multi-Warehouse Sync</div>
              <div className="text-[10px] font-bold text-indigo-600">Latency: 14ms (Optimal)</div>
            </div>
          </div>

          {/* Glow backdrop */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse" />
          
          {/* Mock Window Container */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-900 p-2 sm:p-3 border border-slate-800 shadow-2xl overflow-hidden text-left">
            
            {/* Window Topbar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-950/60 rounded-t-xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
                  https://inventorypro.app/profile • Live Enterprise Dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Connected (14ms)</span>
              </div>
            </div>

            {/* Mock Dashboard Body */}
            <div className="bg-slate-950 p-4 sm:p-6 rounded-b-xl space-y-6">
              
              {/* Header inside Mock */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Executive Overview 👋
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                      Live Warehouse
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time stock valuation & asset management
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span>Quick Filter...</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30">
                    <PackagePlus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </div>
                </div>
              </div>

              {/* KPI Cards inside Mock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">
                      Active Valuation
                    </span>
                    <DollarSign className="w-4 h-4 text-blue-200" />
                  </div>
                  <div className="text-2xl font-black">₹48,92,450</div>
                  <div className="flex items-center gap-1 text-[10px] text-blue-100 font-bold mt-1.5">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% this quarter</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Total Catalog
                    </span>
                    <Boxes className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black">1,482 Items</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-1.5">
                    Across 6 Categories
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Units In Stock
                    </span>
                    <Layers className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-emerald-400">8,940 Units</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-1.5">
                    94.2% optimal capacity
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-300">
                      Low Stock Alerts
                    </span>
                    <Bell className="w-4 h-4 text-red-400 animate-pulse" />
                  </div>
                  <div className="text-2xl font-black text-red-400">2 Critical</div>
                  <div className="text-[10px] text-red-300/80 font-medium mt-1.5">
                    Restock required today
                  </div>
                </div>
              </div>

              {/* Table Preview inside Mock */}
              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
                <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                  <span className="text-xs font-bold text-slate-300">Live Inventory Ledger</span>
                  <span className="text-[10px] font-mono text-slate-500">Auto-updating</span>
                </div>
                <div className="divide-y divide-slate-800/80 text-xs">
                  <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                        LP
                      </div>
                      <div>
                        <div className="font-bold text-slate-200">MacBook Pro M3 Max 16"</div>
                        <div className="text-[10px] text-slate-500">SKU: LAP-M3-904 • Electronics</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-200">₹3,49,900</div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                        14 in Stock
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xs">
                        SN
                      </div>
                      <div>
                        <div className="font-bold text-slate-200">Sony Alpha A7S III Camera</div>
                        <div className="text-[10px] text-slate-500">SKU: CAM-SNY-088 • Photography</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-200">₹2,84,990</div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-400 border border-red-800/60">
                        2 Left (Low Stock)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CUTE SCROLL DOWN CUE */}
        <div className="mt-14 flex flex-col items-center gap-2 text-xs font-bold text-slate-400 animate-bounce">
          <span>Explore Ecosystem & Features</span>
          <ChevronDown className="w-4 h-4 text-blue-600" />
        </div>

      </section>

      {/* CUTE ANIMATED MARQUEE TICKER (INTEGRATIONS & ECOSYSTEM) */}
      <section className="py-8 bg-slate-900 text-white overflow-hidden border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Seamlessly Integrated with Top Commerce & Logistics Networks
          </span>
        </div>

        <div className="flex overflow-x-hidden">
          <div className="animate-marquee flex items-center gap-6">
            {[...partnerLogos, ...partnerLogos].map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 text-xs font-bold text-slate-200 shadow-md hover:border-blue-500 transition-colors flex-shrink-0 cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                <span className="font-extrabold text-white">{partner.name}</span>
                <span className="text-[10px] text-slate-400 font-medium px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KEY METRICS BANNER */}
      <section className="relative z-10 py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">
                ₹150 Cr+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Inventory Valued
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">
                99.98%
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Uptime Reliability
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-1">
                &lt; 50ms
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sync Latency
              </div>
            </div>

            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1">
                10,000+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Warehouses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID CORE CAPABILITIES */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Engineered for Precision & Speed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium mt-3">
            Every feature in InventoryPro is built to eliminate manual errors, prevent stockouts, and give executives absolute control over their supply chain.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 (Large 2 Cols) */}
          <div className="md:col-span-2 figma-card p-8 bg-gradient-to-br from-white to-slate-50/50 flex flex-col justify-between group hover:border-blue-400 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Real-Time Valuation & Asset Accounting
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Automatically calculate your cumulative inventory value, profit margins, cost bases, and price differentials whenever stock arrives or departs.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Automated Asset Revaluation</div>
                  <div className="text-[11px] text-slate-500">Live dynamic SQL ledger calculations</div>
                </div>
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                100% Accurate
              </span>
            </div>
          </div>

          {/* Card 2 (1 Col) */}
          <div className="figma-card p-8 bg-gradient-to-br from-white to-slate-50/50 flex flex-col justify-between group hover:border-blue-400 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 text-red-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Automated Restock Triggers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Set custom safety levels for every product. Visual warning pills and notification badges notify managers when stock runs low.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-red-50/80 border border-red-200/80 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-bold text-red-700">Stockout Warning Triggered</span>
            </div>
          </div>

          {/* Card 3 (1 Col) */}
          <div className="figma-card p-8 bg-gradient-to-br from-white to-slate-50/50 flex flex-col justify-between group hover:border-blue-400 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Warehouse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Warehouse & Bin Routing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Assign items to specific warehouse hubs, aisles, and bin racks. Speed up fulfillment and reduce picking errors by over 40%.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-indigo-700">
              <span>Aisle A1 → Bin R40</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4 (Large 2 Cols) */}
          <div className="md:col-span-2 figma-card p-8 bg-gradient-to-br from-white to-slate-50/50 flex flex-col justify-between group hover:border-blue-400 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                Verified OTP Auth & Cryptographic Security
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Keep unauthorized eyes away from pricing secrets. Multi-step OTP signups, stateless token verification, and granular team privileges protect your company ledger.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs font-bold text-slate-900">Email OTP</div>
                <div className="text-[10px] text-slate-500">Instant Verification</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs font-bold text-slate-900">JWT Token</div>
                <div className="text-[10px] text-slate-500">Stateless Session</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-center">
                <div className="text-xs font-bold text-slate-900">Bcrypt Hash</div>
                <div className="text-[10px] text-slate-500">100% Encrypted</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE WORKFLOW DEEP DIVE TABS */}
      <section id="workflow" className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" /> Interactive Deep-Dive
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Designed for Daily Operational Flow
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium mt-3">
              Click through the tabs below to explore how InventoryPro orchestrates complex supply chains into effortless workflows.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {featureTabs.map((tab) => {
              const Icon = tab.icon;
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isCurrent ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Preview Display */}
          {(() => {
            const current = featureTabs.find((t) => t.id === activeTab) || featureTabs[0];
            return (
              <div className="figma-card p-6 sm:p-10 bg-gradient-to-br from-slate-50 to-blue-50/30 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
                
                {/* Left: Info */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-extrabold">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Module Feature</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {current.title}
                  </h3>

                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    {current.metrics.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200">
                        <div className="text-lg font-black text-blue-600">{m.val}</div>
                        <div className="text-[11px] font-bold text-slate-500">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Test drive this feature</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right: Interactive Mock Box */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-lg">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                      <h4 className="text-xs font-extrabold text-slate-900">{current.previewDetails.heading}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {current.previewDetails.badge}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {current.previewDetails.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 hover:border-blue-200 flex items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.sku}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-extrabold text-slate-900">{item.price}</div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.status.includes("Critical") || item.status.includes("Alert")
                                ? "bg-red-100 text-red-700"
                                : item.status.includes("Low")
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {item.status} ({item.stock})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
            <DollarSign className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Simple Plans for Scaling Teams
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium mt-3">
            Start with our 14-day free trial. No hidden credit card requirements.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Starter */}
          <div className="figma-card p-8 flex flex-col justify-between hover:border-slate-300">
            <div>
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Starter
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">For Small Shops</h3>
              <p className="text-xs text-slate-500 mb-6">
                Essential tools to digitize your initial catalog & stop stockouts.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  {billingCycle === "annual" ? "₹1,199" : "₹1,499"}
                </span>
                <span className="text-xs text-slate-500 font-bold">/ month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Up to 500 catalog items</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Real-time low stock visual alerts</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Single warehouse tracking</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Email support & weekly digest</span>
                </div>
              </div>
            </div>

            <Link
              to="/signup"
              className="mt-8 w-full py-3 rounded-xl border border-slate-200 font-bold text-xs text-slate-800 text-center hover:bg-slate-50 transition-colors block"
            >
              Start Starter Trial
            </Link>
          </div>

          {/* Tier 2: Professional (Featured) */}
          <div className="figma-card p-8 flex flex-col justify-between border-2 border-blue-600 relative shadow-xl shadow-blue-600/10 scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md">
              Most Popular Choice
            </div>

            <div>
              <div className="text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2">
                Professional CRM
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">For Growing Brands</h3>
              <p className="text-xs text-slate-500 mb-6">
                Complete valuation analytics, unlimited items, and team security.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  {billingCycle === "annual" ? "₹2,999" : "₹3,749"}
                </span>
                <span className="text-xs text-slate-500 font-bold">/ month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2.5 font-bold">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Unlimited products & SKUs</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Live asset valuation & profit margins</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Multi-warehouse location bins</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>OTP authentication & session encryption</span>
                </div>
                <div className="flex items-center gap-2.5 font-bold">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Priority 24/7 technical assistance</span>
                </div>
              </div>
            </div>

            <Link
              to="/signup"
              className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs text-center shadow-md shadow-blue-600/25 transition-all block"
            >
              Start 14-Day Pro Trial
            </Link>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="figma-card p-8 flex flex-col justify-between hover:border-slate-300">
            <div>
              <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Enterprise
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Custom Scale</h3>
              <p className="text-xs text-slate-500 mb-6">
                Dedicated database clusters, custom integrations & SLA guarantees.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-slate-900">
                  {billingCycle === "annual" ? "₹7,999" : "₹9,999"}
                </span>
                <span className="text-xs text-slate-500 font-bold">/ month</span>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Everything in Professional</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Custom API webhooks & ERP bridges</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Dedicated account architect</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>99.99% uptime SLA contract</span>
                </div>
              </div>
            </div>

            <Link
              to="/signup"
              className="mt-8 w-full py-3 rounded-xl border border-slate-200 font-bold text-xs text-slate-800 text-center hover:bg-slate-50 transition-colors block"
            >
              Contact Enterprise
            </Link>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Trusted by 10,000+ Modern Operators
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-medium mt-3">
              Hear why supply chain leads and commerce founders rely on InventoryPro daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "Before InventoryPro, we suffered ₹5-8 Lakhs in monthly dead-stock losses. Their live safety triggers and valuation ledger completely turned our cash flow around."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                  RV
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Rahul Verma</div>
                  <div className="text-[10px] text-slate-400">Head of Operations, Apex Retail</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "The UI is unbelievably fast and clean. Adding 300+ electronics items with image uploads and SKU categories took our team less than an afternoon."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  PS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Priya Sharma</div>
                  <div className="text-[10px] text-slate-400">Founder, NexGen Logistics</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "The OTP security and JWT stateless session give us enterprise peace of mind. Highly recommended for any serious business scale."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                  AK
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Amit Kumar</div>
                  <div className="text-[10px] text-slate-400">CTO, CloudMart India</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Have Questions? We’ve Got Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="figma-card overflow-hidden transition-all duration-200 border border-slate-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* BOTTOM HERO CTA BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-widest border border-white/20">
              Get Started In 60 Seconds
            </span>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to Take Full Command of Your Inventory?
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Join thousands of businesses managing their catalogs, tracking asset valuation, and eliminating stockouts with InventoryPro.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-blue-700 font-black text-sm hover:bg-slate-100 shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In to Existing Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
                  <Boxes className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-slate-900">
                  Inventory<span className="text-blue-600">Pro</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enterprise CRM & Real-Time Stock Ledger platform. Built for modern high-velocity retail, commerce, and warehouse operations.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All operational systems normal (99.98%)</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Platform
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li><a href="#features" className="hover:text-blue-600 transition-colors">Catalog Architecture</a></li>
                <li><a href="#workflow" className="hover:text-blue-600 transition-colors">Valuation Ledger</a></li>
                <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing & Plans</a></li>
                <li><Link to="/login" className="hover:text-blue-600 transition-colors">Sign In Portal</Link></li>
                <li><Link to="/signup" className="hover:text-blue-600 transition-colors">Create Workspace</Link></li>
              </ul>
            </div>

            {/* Col 3: Security & Trust */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Security & Trust
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 font-medium">
                <li className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>AES-256 Cloud Encryption</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Stateless JWT Authentication</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Automated OTP Verifications</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Live Audit Log Trails</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Quick Access
              </h4>
              <div className="space-y-2">
                <Link
                  to="/signup"
                  className="w-full py-2 px-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center justify-between transition-colors block"
                >
                  <span>Register Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs flex items-center justify-between transition-colors block"
                >
                  <span>Employee Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
            <div>
              © {new Date().getFullYear()} InventoryPro CRM Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-600">Privacy Policy</a>
              <a href="#" className="hover:text-slate-600">Terms of Service</a>
              <a href="#" className="hover:text-slate-600">Security Standards</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CUTE FLOATING BACK TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-110 active:scale-95 transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 group"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}

export default Landing;
