import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createBook } from "@/lib/api";

export function AddBook() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) {
      setError("Book title is required.");
      return;
    }
    if (!price.trim() || Number(price) <= 0) {
      setError("Valid price is required.");
      return;
    }
    if (!deliveryCharges.trim() || Number(deliveryCharges) < 0) {
      setError("Valid delivery charges required.");
      return;
    }
    if (!description.trim()) {
      setError("Book description is required.");
      return;
    }
    if (!thumbnailImage || !coverImage) {
      setError("Both thumbnail and cover images are required.");
      return;
    }
    setSubmitting(true);
    const data = new FormData();
    data.set("title", title.trim());
    data.set("price", price);
    data.set("deliveryCharges", deliveryCharges);
    data.set("description", description.trim());
    data.set("thumbnailImage", thumbnailImage);
    data.set("coverImage", coverImage);
    const result = await createBook(data);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="text-slate-400 transition hover:text-white">
          ← Orders
        </Link>
        <h1 className="text-2xl font-bold text-white">Add Book</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-[var(--card-bg)] p-6 shadow-card"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Book title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Book title"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Book price (Rs) *</label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="1499"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Delivery charges (Rs) *</label>
            <input
              type="number"
              min="0"
              step="1"
              value={deliveryCharges}
              onChange={(e) => setDeliveryCharges(e.target.value)}
              required
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="150"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Book description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Full book description"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Book thumbnail image *</label>
          <p className="mb-1 text-xs text-slate-500">JPG, PNG, WebP or GIF</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.gif"
            onChange={(e) => setThumbnailImage(e.target.files?.[0] ?? null)}
            required
            className="block w-full rounded-lg border border-white/20 bg-white/5 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-amber-500/20 file:px-3 file:py-2 file:text-amber-300"
          />
          {thumbnailImage && <p className="mt-1 text-xs text-slate-500">Selected: {thumbnailImage.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Full book cover image *</label>
          <p className="mb-1 text-xs text-slate-500">JPG, PNG, WebP or GIF</p>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.gif"
            onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
            required
            className="block w-full rounded-lg border border-white/20 bg-white/5 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-amber-500/20 file:px-3 file:py-2 file:text-amber-300"
          />
          {coverImage && <p className="mt-1 text-xs text-slate-500">Selected: {coverImage.name}</p>}
        </div>
        {error && (
          <p className="rounded-lg bg-red-900/30 py-2 px-3 text-sm text-red-300" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-amber-500 px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-70"
        >
          {submitting ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
