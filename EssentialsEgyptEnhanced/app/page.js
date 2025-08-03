import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Essentials Egypt Enhanced</h1>
      <p className="text-center max-w-xl mb-6">
        This platform brings all of your social media, advertising and analytics together
        under one roof. Connect your accounts, plan content, analyse performance and
        collaborate with your team.
      </p>
      <Link
        href="/dashboard"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}