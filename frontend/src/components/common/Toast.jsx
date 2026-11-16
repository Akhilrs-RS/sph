import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in shadow-2xl">
      <div className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md ${
        isSuccess 
          ? 'bg-slate-900/95 text-white border-emerald-500/40' 
          : isError 
            ? 'bg-red-950/95 text-white border-red-500/40' 
            : 'bg-slate-900/95 text-white border-blue-500/40'
      }`}>
        <div className="flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertTriangle className="w-5 h-5 text-red-400" />}
          {isInfo && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <p className="text-sm font-medium pr-2">{toast.message}</p>
      </div>
    </div>
  );
}

