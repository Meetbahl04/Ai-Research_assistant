interface Props {
  role:
    | "user"
    | "assistant";

  content: string;
}

export default function MessageBubble({
  role,
  content,
}: Props) {

  const isUser =
    role === "user";

  return (

    <div
      className={`
        p-4
        rounded-xl
        mb-4
        max-w-3xl
        ${
          isUser
            ? "bg-blue-600 ml-auto"
            : "bg-slate-800"
        }
      `}
    >
      {content}
    </div>
  );
}