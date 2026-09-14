"use client";

import Sidebar from "./Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.8)] backdrop-blur-md">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}