"use client";

import { useState } from "react";

import {
  uploadDocument,
} from "../services/document";

export default function UploadDocument({
  workspaceId,
  onSuccess,
}: {
  workspaceId: string;
  onSuccess?: () => void;
}) {

  const [file,
    setFile] =
    useState<File | null>(null);

  const [loading,
    setLoading] =
    useState(false);

  const handleUpload =
    async () => {

      if (!file) return;

      try {

        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        await uploadDocument(
          file,
          workspaceId,
          token || ""
        );

        alert(
          "Document uploaded successfully."
        );

        setFile(null);

        onSuccess?.();

      } catch (error) {

        console.log(error);
        alert("Failed to upload the document.");

      } finally {

        setLoading(false);
      }
    };

  return (

    <div>

      <input
        type="file"
        accept=".pdf"
        className="
      w-full
      bg-slate-800
      p-3
      rounded-lg
      border
      border-slate-700
      "
        onChange={(e) =>
          setFile(
            e.target.files?.[0] ||
            null
          )
        }
      />

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="
      mt-4
      w-full
      bg-blue-600
      hover:bg-blue-700
      disabled:opacity-50
      disabled:cursor-not-allowed
      rounded-lg
      px-4
      py-3
      font-medium
      transition
      "
      >
        {
          loading
            ? "Uploading..."
            : "Upload PDF"
        }
      </button>

    </div>

  );
}