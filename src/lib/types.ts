export interface BookDetails {
  id: string;
  title: string;
  price: number;
  deliveryCharges: number;
  description: string;
  preview: string;
  thumbnailImage: string;
  coverImage: string;
}

export type PaymentMode = "cash" | "online";

export interface OrderFormData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  paymentMode: PaymentMode;
}

export interface MockOrder {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  paymentMode: "Cash on Delivery" | "Online Manual Payment";
  status: "Pending" | "Verified" | "Shipped";
}
