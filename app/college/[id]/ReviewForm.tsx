'use client';
import { useState } from "react";

export default function ReviewForm({ collegeId }: { collegeId: string }) {
  const [user, setUser] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch(`/api/colleges/${collegeId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, rating: Number(rating), comment }),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setSuccess("Review submitted!");
      setUser("");
      setRating("");
      setComment("");
    } catch {
      setError("Could not submit review. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input type="text" name="user" placeholder="Your name" className="w-full px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white" value={user} onChange={e => setUser(e.target.value)} required />
      <select name="rating" className="w-full px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white" value={rating} onChange={e => setRating(e.target.value)} required>
        <option value="">Rating</option>
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <textarea name="comment" placeholder="Your review" className="w-full px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white" rows={3} value={comment} onChange={e => setComment(e.target.value)} required />
      <button type="submit" className="px-4 py-2 rounded bg-black text-white dark:bg-white dark:text-black font-semibold" disabled={loading}>{loading ? "Submitting..." : "Submit Review"}</button>
      {success && <div className="text-green-600 dark:text-green-400">{success}</div>}
      {error && <div className="text-red-600 dark:text-red-400">{error}</div>}
    </form>
  );
}
