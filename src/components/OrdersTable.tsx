import { useState, useEffect } from "react";
import { StatusDropdown } from "./StatusDropdown";
import { updateOrderStatus, downloadSlip } from "@/lib/api";
import type { Order } from "@/lib/api";

interface OrdersTableProps {
  orders: Order[];
  onOrdersChange?: () => void;
}

interface AddressModalProps {
  address: string;
  customerName: string;
  orderNumber?: string;
  onClose: () => void;
}

function AddressModal({ address, customerName, orderNumber, onClose }: AddressModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Delivery Address</h2>
        <p className="mb-4 text-sm text-slate-600">Order: {orderNumber}</p>
        <p className="mb-2 text-sm font-medium text-slate-700">Customer: {customerName}</p>
        <div className="mb-6 rounded-md bg-slate-100 p-4">
          <p className="whitespace-pre-wrap text-sm text-slate-800">{address}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function OrdersTable({ orders, onOrdersChange }: OrdersTableProps) {
  const [statuses, setStatuses] = useState<Record<string, Order["status"]>>(
    () => Object.fromEntries(orders.map((o) => [o.id, o.status]))
  );
  const [selectedAddress, setSelectedAddress] = useState<{
    address: string;
    customerName: string;
    orderNumber?: string;
  } | null>(null);

  useEffect(() => {
    setStatuses(Object.fromEntries(orders.map((o) => [o.id, o.status])));
  }, [orders]);

  const handleStatusChange = async (orderId: string, status: Order["status"]) => {
    setStatuses((prev) => ({ ...prev, [orderId]: status }));
    await updateOrderStatus(orderId, status);
    onOrdersChange?.();
  };

  const handleDownloadSlip = (orderId: string, orderNumber?: string) => {
    downloadSlip(orderId, orderNumber);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--card-bg)] shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  City
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Payment Mode
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const status = statuses[order.id] ?? order.status;
                const isOnline = order.paymentMode === "Online Manual Payment";
                return (
                  <tr
                    key={order.id}
                    className={`border-b border-white/5 transition ${
                      index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    } ${
                      isOnline ? "ring-inset ring-l-2 ring-amber-500/40" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-sm font-medium text-white">
                      {order.orderNumber ?? order.id}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {order.phone}
                    </td>
                    <td
                      className="max-w-[200px] truncate px-4 py-3 text-sm text-blue-400 cursor-pointer hover:text-blue-300 transition"
                      onClick={() =>
                        setSelectedAddress({
                          address: order.address ?? "—",
                          customerName: order.customerName,
                          orderNumber: order.orderNumber,
                        })
                      }
                    >
                      {order.address ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {order.city}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block whitespace-nowrap rounded px-2.5 py-1 text-xs font-medium ${
                          isOnline
                            ? "bg-emerald-500/20 text-emerald-200"
                            : "bg-slate-600/60 text-slate-300"
                        }`}
                      >
                        {order.paymentMode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusDropdown
                        value={status}
                        onChange={(v) => handleStatusChange(order.id, v)}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      {isOnline ? (
                        <button
                          type="button"
                          onClick={() => handleDownloadSlip(order.id, order.orderNumber)}
                          className="rounded-md border border-slate-500 bg-slate-700/80 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        >
                          Download Slip
                        </button>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedAddress && (
        <AddressModal
          address={selectedAddress.address}
          customerName={selectedAddress.customerName}
          orderNumber={selectedAddress.orderNumber}
          onClose={() => setSelectedAddress(null)}
        />
      )}
    </>
  );
}
