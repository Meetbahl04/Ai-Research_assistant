"use client";

import { useState } from "react";
import { askQuestion } from "../../../services/chat";

export default function ChatPage() {
  const [question,
    setQuestion] =
    useState("");
  const [workspaceId,
    setWorkspaceId] =
    useState("");
  const [answer,
    setAnswer] =
    useState("");
  const [loading,
    setLoading] =
    useState(false);

  const handleAsk =
    async () => {
      if (!workspaceId.trim()) {
        alert("Please enter a workspace ID.");
        return;
      }
      if (!question.trim()) {
        return;
      }

      try {
        setLoading(true);
        const res =
          await askQuestion(
            question,
            workspaceId
          );
        setAnswer(
          res.answer || "No answer returned."
        );
      } catch (error) {
        console.error(error);
        setAnswer("Unable to retrieve an answer.");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.9)]">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">
          Workspace chat
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Ask questions from your docs.
        </h1>
        <p className="text-slate-400">
          Use your workspace ID and type a question to query the AI assistant.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <input
          className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-400"
          placeholder="Workspace ID"
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="rounded-3xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 disabled:opacity-50"
        >
          {loading ? "Asking…" : "Ask"}
        </button>
      </div>

      <textarea
        className="w-full min-h-[180px] rounded-3xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none focus:border-sky-400"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
        <h2 className="text-xl font-semibold text-white">Answer</h2>
        <p className="mt-3 whitespace-pre-line text-slate-300">
          {answer || "Your answer will appear here once the assistant responds."}
        </p>
      </div>
    </div>
  );
}