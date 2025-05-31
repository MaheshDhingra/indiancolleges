import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-4xl font-bold mb-4">College Not Found</h1>
      <p className="mb-6 text-zinc-500">Sorry, we couldn&apos;t find the college you&apos;re looking for.</p>
      <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Back to Home</Link>
    </div>
  );
}
