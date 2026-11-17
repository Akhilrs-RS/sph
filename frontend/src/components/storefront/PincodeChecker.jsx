import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

export default function PincodeChecker() {
  const { userPincode, setUserPincode, resolvePincode } = useApp();
  const [inputVal, setInputVal] = useState(userPincode);
  const [result, setResult] = useState(() => resolvePincode(userPincode));
  const [checked, setChecked] = useState(true);

  const handleCheck = (e) => {
    e.preventDefault();
    const res = resolvePincode(inputVal);
    setResult(res);
    setChecked(true);
    if (res.valid) {
      setUserPincode(res.pincode);
    }
  };

  return (
    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/70 text-xs">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Delivery & COD Availability</span>
        </span>
        {result?.valid && (
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            Serviceable
          </span>
        )}
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit PIN code (e.g. 560038)"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.replace(/\D/g, ''))}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-400 tracking-wider"
          />
        </div>
        <button
          type="submit"
          className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
        >
          Check
        </button>
      </form>

      {checked && result && (
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 space-y-1.5">
          {result.valid ? (
            <>
              <div className="flex items-center gap-2 text-slate-800 font-medium">
                <Truck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span>
                  Delivering to <strong className="text-slate-950">{result.city}, {result.state}</strong>: {result.estimatedDelivery}
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Cash on Delivery (COD) & Free Line-Haul Shipping Available</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 text-rose-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{result.error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
