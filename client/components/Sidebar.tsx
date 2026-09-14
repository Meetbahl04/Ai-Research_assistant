"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  useWorkspaces,
} from "./WorkspaceProvider";

export default function Sidebar() {

  const {
    workspaces,
  } = useWorkspaces();

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (

    <aside
      className="
      w-72
      bg-slate-900
      border-r
      border-slate-800
      p-5
      flex
      flex-col
      justify-between
      "
    >

      <h1
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        AI Research
      </h1>

      <p
        className="
        text-slate-400
        text-sm
        mb-4
        "
      >
        Workspaces
      </p>

      {workspaces.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No workspaces yet. Create one on the dashboard.
        </p>
      ) : (
        workspaces.map(
          (workspace) => (

            <Link
              key={
                workspace.id
              }
              href={
                `/workspace/${workspace.id}`
              }
              className="
            block
            p-3
            rounded-lg
            hover:bg-slate-800
            transition
            mb-2
            "
            >
              {workspace.name}
            </Link>

          )
        )
      )}

      <button
        onClick={handleLogout}
        className="
        mt-6
        w-full
        rounded-xl
        bg-red-600
        px-4
        py-3
        text-sm
        font-medium
        text-white
        hover:bg-red-700
        transition
        "
      >
        Logout
      </button>

    </aside>

  );
}