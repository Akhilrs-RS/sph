import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  CheckCircle2,
  Clock,
  Zap,
  ExternalLink,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Eye,
  X,
  Copy,
  Check
} from 'lucide-react';

export default function OrdersFulfillmentView() {
  const { orders, fulfillOrder, setStoreTab, setTrackingLookupId, setActiveView, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectOrder, setInspectOrder] = useState(null);
  const [copiedAwb, setCopiedAwb] = useState(null);

  const statuses = ['All', 'Pending Sourcing', 'In Transit', 'Delivered'];

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchSearch = !searchTerm ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const handleTrackInStore = (order) => {
    setTrackingLookupId(order.id);
    setActiveView('store');
    setStoreTab('track');
  };

  const handleCopyAwb = (awb, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(awb);
    setCopiedAwb(awb);
    showToast(`AWB ${awb} copied!`);
    setTimeout(() => setCopiedAwb(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Orders & Automated Dropship Fulfillment
            </h1>
            <span className="text-xs bg-slate-900 text-white font-mono font-bold px-2 py-0.5 rounded-full">
              {orders.length} total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time feed of customer checkouts. Click "Auto-Fulfill" to charge prepaid supplier balance and trigger direct vendor dispatch.
          </p>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Order ID / Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                  statusFilter === s
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer & Destination</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Revenue / Cost</th>
                <th className="py-3.5 px-4">Gross Margin</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const isPending = order.status === 'Pending Sourcing';
                  const isInTransit = order.status === 'In Transit';
                  const isDelivered = order.status === 'Delivered';

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition">
                      {/* Order ID */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 block">{order.id}</span>
                        <span className="text-[10px] text-slate-600">
                          {new Date(order.placedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(order.placedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{order.customer.name}</p>
                        <p className="text-[10px] text-slate-600 truncate max-w-[180px]">{order.customer.address}</p>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={order.items[0]?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div className="truncate max-w-[160px]">
                            <span className="font-medium text-slate-900 block truncate">{order.items[0]?.title}</span>
                            <span className="text-[10px] text-slate-600">
                              Qty: {order.items[0]?.quantity} • {order.items[0]?.variant}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Revenue & Cost */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-slate-900 block">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-600">Cost: ₹{order.totalCost.toLocaleString('en-IN')}</span>
                      </td>

                      {/* Margin */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-emerald-600 block">+₹{order.grossProfit.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-600">
                          {((order.grossProfit / order.totalAmount) * 100).toFixed(0)}% margin
                        </span>
                      </td>

                      {/* Status & Carrier Waybill */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                            : isInTransit
                              ? 'bg-blue-50 text-blue-800 border border-blue-200/60'
                              : 'bg-amber-50 text-amber-800 border border-amber-200/60'
                        }`}>
                          {isDelivered && <CheckCircle2 className="w-3 h-3" />}
                          {isInTransit && <Truck className="w-3 h-3" />}
                          {isPending && <Clock className="w-3 h-3" />}
                          <span>{order.status}</span>
                        </span>
                        {order.trackingNumber ? (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-[10px] font-mono text-slate-600 truncate max-w-[110px]" title={order.trackingNumber}>
                              {order.trackingNumber}
                            </span>
                            <button
                              onClick={(e) => handleCopyAwb(order.trackingNumber, e)}
                              className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                              title="Copy AWB Number"
                            >
                              {copiedAwb === order.trackingNumber ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 block mt-0.5">AWB Unassigned</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending ? (
                            <button
                              onClick={() => fulfillOrder(order.id)}
                              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] transition shadow shadow-emerald-600/20"
                              title="Send automated purchase order to vendor"
                            >
                              <Zap className="w-3.5 h-3.5 fill-white" />
                              <span>Auto-Fulfill</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleTrackInStore(order)}
                              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1.5 rounded-xl text-[11px] transition"
                              title="Track parcel journey"
                            >
                              <ExternalLink className="w-3 h-3 text-blue-600" />
                              <span>Track</span>
                            </button>
                          )}
                          <button
                            onClick={() => setInspectOrder(order)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                            title="View Full PO Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {inspectOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Purchase Order Manifest</span>
                <h3 className="text-lg font-black text-slate-900 font-mono">{inspectOrder.id}</h3>
              </div>
              <button
                onClick={() => setInspectOrder(null)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">Customer Shipping Label</span>
                <p className="font-semibold text-slate-900">{inspectOrder.customer.name}</p>
                <p className="text-slate-600">{inspectOrder.customer.address}</p>
                <p className="text-slate-500 mt-0.5">{inspectOrder.customer.email}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">Supplier Warehouse Dispatch</span>
                <div className="flex justify-between">
                  <span>Vendor Partner:</span>
                  <span className="font-bold text-slate-900">{inspectOrder.supplierPlatform}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Shipping Method:</span>
                  <span className="font-semibold text-slate-800">{inspectOrder.shippingCarrier}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Tracking Number:</span>
                  <span className="font-mono font-bold text-blue-600">
                    {inspectOrder.trackingNumber || 'Pending Auto-Fulfillment'}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-between font-bold text-slate-900 text-sm">
                <span>Calculated Net Margin:</span>
                <span className="text-emerald-600 font-black">+₹{inspectOrder.grossProfit.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {inspectOrder.status === 'Pending Sourcing' && (
                <button
                  onClick={() => {
                    fulfillOrder(inspectOrder.id);
                    setInspectOrder(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Execute Supplier PO (₹{inspectOrder.totalCost.toLocaleString('en-IN')})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

