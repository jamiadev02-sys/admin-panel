const API_BASE = "https://syedjawadnaqvi.com/sale-api";

export interface Order {
  id: string;
  orderNumber?: string;
  customerName: string;
  phone: string;
  address?: string;
  city: string;
  paymentMode: "Cash on Delivery" | "Online Manual Payment";
  status: "Pending" | "Verified" | "Shipped";
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/api/orders`);
  if (!res.ok) return [];
  return res.json();
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<Order | null> {
  const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) return null;
  return res.json();
}

/** Map blob MIME type to file extension for slip download. */
function extFromMime(type: string): string {
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/png") return ".png";
  if (type === "image/webp") return ".webp";
  if (type === "application/pdf") return ".pdf";
  return ".pdf";
}

/** Download payment slip (Admin). Fetches file and triggers download. */
export async function downloadSlip(orderId: string, orderNumber?: string): Promise<void> {
  const url = `${API_BASE}/api/orders/${orderId}/slip`;
  const res = await fetch(url);
  if (!res.ok) return;
  const blob = await res.blob();
  let name = "";
  const disp = res.headers.get("Content-Disposition");
  const fromHeader = disp && (/(?:filename\*?=(?:UTF-8'')?)?["']?([^"';\n]+)["']?/i.exec(disp) || /filename=([^;\n]+)/i.exec(disp));
  if (fromHeader && fromHeader[1]) {
    name = fromHeader[1].trim().replace(/^["']|["']$/g, "");
  }
  if (!name || !/\.(jpg|jpeg|png|pdf)$/i.test(name)) {
    const ext = extFromMime(blob.type || "");
    name = orderNumber ? `payment-slip-${orderNumber}${ext}` : `payment-slip${ext}`;
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

export interface AddBookForm {
  title: string;
  author: string;
  isbn: string;
  category: string;
  stock: string;
  slug: string;
  publishedYear: string;
  language: string;
  price: string;
  deliveryCharges: string;
  description: string;
  preview: string;
  thumbnailImage: File | null;
  coverImage: File | null;
}

export async function createBook(formData: FormData): Promise<{ id?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/books`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) return { error: data.error || "Failed to add book" };
  return { id: data.id };
}
