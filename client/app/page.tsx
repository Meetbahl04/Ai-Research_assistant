import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-12">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-[0_40px_120px_-50px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">
              AI research assistant
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Research smarter with AI-powered document intelligence.
            </h1>
            <p className="text-lg leading-8 text-slate-400">
              Upload PDFs, organize workspaces, and ask questions against your documents with an intuitive research assistant.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-7 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 px-7 py-4 text-base font-semibold text-white transition hover:border-slate-500"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <h2 className="text-lg font-semibold text-white">Workspace Projects</h2>
              <p className="mt-3 text-slate-400">Keep each research topic isolated and easy to manage.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <h2 className="text-lg font-semibold text-white">PDF Intelligence</h2>
              <p className="mt-3 text-slate-400">Extract insights from documents and query them as needed.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6">
              <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
              <p className="mt-3 text-slate-400">Get accurate answers from your uploaded research content.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}