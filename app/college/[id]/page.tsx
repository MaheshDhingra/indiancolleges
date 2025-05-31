import { notFound } from "next/navigation";

import ReviewForm from "./ReviewForm";

async function getCollege(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/colleges/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getReviews(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/colleges/${id}/reviews`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function CollegeDetail({ params }: { params: { id: string } }) {
  const college = await getCollege(params.id);
  if (!college) return notFound();
  const reviews = await getReviews(params.id);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
      <p className="text-zinc-500 mb-2">{college.type} • {college.location}</p>
      <img src={college.image} alt={college.name} className="w-full h-64 object-cover rounded-xl mb-4" />
      <p className="mb-4">{college.description}</p>
      <div className="mb-4">
        <span className="font-semibold">Top Package:</span> {college.top_package}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Cutoff:</span> {college.cutoff}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Rating:</span> <span className="text-yellow-500">{'★'.repeat(Math.round(college.rating || 0))}{'☆'.repeat(5 - Math.round(college.rating || 0))}</span> {college.rating} ({college.reviews} reviews)
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Student Reviews</h2>
        <ul className="space-y-2">
          {reviews.length === 0 && <li className="text-zinc-500">No reviews yet.</li>}
          {reviews.map((r: any, i: number) => (
            <li key={i} className="border rounded p-3 bg-zinc-50 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold">{r.user_name}</span>
                <span className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p>{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t pt-4 mt-6">
        <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
        <div suppressHydrationWarning={true}>
          <ReviewForm collegeId={params.id} />
        </div>
      </div>
    </div>
  );
}
