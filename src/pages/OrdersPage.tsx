import { useEffect, useState } from "react";
import { OrdersTable } from "@/components/OrdersTable";
import { fetchOrders } from "@/lib/api";
import type { Order } from "@/lib/api";

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const refreshOrders = () => {
    fetchOrders().then(setOrders);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
          Orders Dashboard
        </h1>
        <p className="text-slate-400">
          View and manage orders. Online payment orders are highlighted.
        </p>
      </div>
      {loading ? (
        <p className="text-slate-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-400">No orders yet.</p>
      ) : (
        <OrdersTable orders={orders} onOrdersChange={refreshOrders} />
      )}
    </div>
  );
}
