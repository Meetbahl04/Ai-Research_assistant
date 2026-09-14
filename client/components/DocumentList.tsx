interface Document {
  id: string;
  filename: string;
}

export default function DocumentsList({
  documents,
}: {
  documents: Document[];
}) {

  return (
    <div>

      {documents.length === 0 ? (
        <p>
          No documents uploaded
        </p>
      ) : (
        documents.map(
          (doc) => (
            <div
              key={doc.id}
              className="
              p-3
              rounded-lg
              bg-slate-800
              border
              border-slate-700
              mb-2
              "
            >
  📄        {doc.filename}
            </div>
          )
        )
      )}

    </div>
  );
}