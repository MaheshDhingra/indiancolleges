'use client';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CollegeList() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load colleges");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-black dark:text-white tracking-tight">Find Indian Colleges</h1>
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <input
            type="text"
            placeholder="Search by college name, city, or field..."
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            // TODO: Add search logic
          />
          <select className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white focus:outline-none">
            <option value="">All Types</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
          </select>
        </div>
        {loading ? (
          <div className="text-center py-10 text-lg text-zinc-500">Loading colleges...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <Link key={college.id} href={`/college/${college.id}`}
                className="group block bg-white dark:bg-zinc-900 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:-translate-y-1">
                <div className="h-40 w-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-300">
                  <img
                    src={college.image}
                    alt={college.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-1 text-black dark:text-white group-hover:underline">{college.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white font-semibold border border-zinc-300 dark:border-zinc-700">{college.type}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{college.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-black dark:text-white">{'★'.repeat(Math.round(college.rating))}{'☆'.repeat(5 - Math.round(college.rating))}</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{college.rating} ({college.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-col gap-1 text-sm">
                    <span><span className="font-semibold text-black dark:text-white">Top Package:</span> {college.top_package}</span>
                    <span><span className="font-semibold text-black dark:text-white">Cutoff:</span> {college.cutoff}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
