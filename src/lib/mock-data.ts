import type { BookDetails, MockOrder } from "./types";

const bookImageBase =
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f";

export const mockBook: BookDetails = {
  id: "book-1",
  title: "The Art of Building Modern Web Apps",
  price: 1499,
  deliveryCharges: 150,
  description:
    "A practical guide to building scalable, maintainable web applications with modern tools and best practices.",
  preview:
    "This book covers everything from project setup to deployment, with real-world examples and clean code principles.",
  thumbnailImage: `${bookImageBase}?w=120&h=180&fit=crop`,
  coverImage: `${bookImageBase}?w=400&h=600&fit=crop`,
};

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-001",
    customerName: "Ali Ahmed",
    phone: "0300-1234567",
    city: "Lahore",
    paymentMode: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: "ORD-002",
    customerName: "Sara Khan",
    phone: "0345-7654321",
    city: "Karachi",
    paymentMode: "Online Manual Payment",
    status: "Verified",
  },
  {
    id: "ORD-003",
    customerName: "Hassan Raza",
    phone: "0321-9876543",
    city: "Islamabad",
    paymentMode: "Cash on Delivery",
    status: "Shipped",
  },
  {
    id: "ORD-004",
    customerName: "Fatima Noor",
    phone: "0333-5551234",
    city: "Faisalabad",
    paymentMode: "Online Manual Payment",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customerName: "Omar Sheikh",
    phone: "0312-4445678",
    city: "Rawalpindi",
    paymentMode: "Cash on Delivery",
    status: "Verified",
  },
];
