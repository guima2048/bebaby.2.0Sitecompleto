import { useState } from "react";

export default function FeedbackToast({ message, type = "success", show, onClose }: { message: string; type?: "success" | "error"; show: boolean; onClose: () => void }) {
  if (!show) return null;
  return (
    <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold z-50 transition-all ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      {message}
      <button className="ml-4 text-white/80 hover:text-white font-bold" onClick={onClose}>×</button>
    </div>
  );
} 