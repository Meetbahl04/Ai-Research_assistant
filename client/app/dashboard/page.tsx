"use client";

import { useState } from "react";
import Link from "next/link";

import AppLayout from "../../components/Applayout";

import { createWorkspace } from "../../services/workspace";

import {
  useWorkspaces,
} from "../../components/WorkspaceProvider";

export default function DashboardPage() {

  const [name, setName] =
    useState("");

  const {
    workspaces,
    setWorkspaces,
  } = useWorkspaces();

  const handleCreate =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          alert(
            "Please login first"
          );
          return;
        }

        const response =
          await createWorkspace(
            name,
            token
          );

        setWorkspaces([
          ...workspaces,
          response.data,
        ]);

        setName("");

        alert(
          "Workspace created successfully."
        );

      } catch (error) {
        console.log(error);
        alert(
          "Failed to create workspace."
        );
      }
    };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-2">
            Create a workspace and open it from the sidebar.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
            placeholder="Workspace Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <button
            onClick={handleCreate}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
          >
            Create Workspace
          </button>
        </div>

        <section className="bg-slate-900 rounded-xl border border-slate-800 p-5">
          <h2 className="text-2xl font-semibold mb-4">
            Your workspaces
          </h2>

          {workspaces.length === 0 ? (
            <p className="text-slate-400">
              No workspaces yet. Create one to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {workspaces.map((workspace) => (
                <Link
                  key={workspace.id}
                  href={`/workspace/${workspace.id}`}
                  className="block rounded-xl border border-slate-700 bg-slate-950 p-4 hover:bg-slate-800 transition"
                >
                  <div className="font-semibold">
                    {workspace.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(workspace.createdAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}