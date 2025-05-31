import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-700 text-white py-4 shadow">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">Indian Colleges</Link>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">Home</Link>
          {/* <Link href="/about" className="hover:underline">About</Link> */}
        </nav>
      </div>
    </header>
  );
}
