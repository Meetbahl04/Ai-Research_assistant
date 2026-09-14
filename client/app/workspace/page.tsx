"use client";

import Link from "next/link";
import AppLayout from "../../components/Applayout";

export default function WorkspacePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Workspaces
          </h1>
          <p className="text-slate-400 mt-2">
            Select a workspace from the sidebar or create one on the dashboard.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-semibold mb-3">
            Need a workspace?
          </h2>
          <p className="text-slate-400 mb-6">
            Head to the dashboard to create a new workspace and then open it from the sidebar.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}