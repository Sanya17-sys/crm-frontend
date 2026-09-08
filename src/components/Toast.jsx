import React from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export function Toast({ toast, onClose }) {
  if (!toast || !toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
  };

  const bgStyles = {
    success: "bg-white border-emerald-200 text-slate-900 shadow-emerald-500/10",
    error: "bg-white border-red-200 text-slate-900 shadow-red-500/10",
    warning: "bg-white border-red-200 text-slate-900 shadow-red-500/10",
    info: "bg-white border-blue-200 text-slate-900 shadow-blue-500/10",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border shadow-xl backdrop-blur-md min-w-[320px] max-w-md ${
          bgStyles[toast.type || "success"]
        }`}
      >
        {icons[toast.type || "success"]}
        <div className="flex-1 text-xs font-bold text-slate-900 pr-2">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
