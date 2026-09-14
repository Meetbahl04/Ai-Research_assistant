"use client";

import { useEffect, useState } from "react";
import AppLayout from "../../../components/Applayout";
import UploadDocument from "../../../components/UploadDocument";
import ChatPanel from "../../../components/ChatPanel";
import DocumentsList from "../../../components/DocumentList";
import { getDocuments } from "../../../services/document";

interface DocumentItem {
  id: string;
  filename: string;
}

export default function WorkspacePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [documents,
    setDocuments] =
    useState<DocumentItem[]>([]);
  const [loading,
    setLoading] =
    useState(false);

  const loadDocuments =
    async () => {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        return;
      }

      try {
        setLoading(true);
        const response =
          await getDocuments(
            params.id,
            token
          );
        setDocuments(
          response.data || []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadDocuments();
  }, [params.id]);

  return (

    <AppLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Workspace
        </h1>

        <p className="text-slate-400 mt-2">
          ID: {params.id}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-1">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <h2 className="text-xl font-semibold mb-4">
              Documents
            </h2>

            <UploadDocument
              workspaceId={params.id}
              onSuccess={loadDocuments}
            />

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">
                Uploaded files
              </h3>

              {loading ? (
                <p>Loading documents…</p>
              ) : (
                <DocumentsList documents={documents} />
              )}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h2 className="text-xl font-semibold mb-4">
              AI Chat
            </h2>

            <ChatPanel
              workspaceId={params.id}
            />
          </div>
        </div>

      </div>

    </AppLayout>

  );
}