"use client";

import { useState } from "react";

import {
  askQuestion,
} from "../services/chat";
import MessageBubble from "./MessageBubbles";

interface Message {
  role:
    | "user"
    | "assistant";

  content: string;
}

export default function ChatPanel({
  workspaceId,
}: {
  workspaceId: string;
}) {

  const [question,
    setQuestion] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [messages,
    setMessages] =
    useState<Message[]>([]);

  const handleAsk =
    async () => {

      if (!workspaceId) {
        alert("Workspace ID is required to ask questions.");
        return;
      }

      if (!question.trim())
        return;

      const currentQuestion =
        question;

      setMessages(
        (prev) => [
          ...prev,
          {
            role: "user",
            content:
              currentQuestion,
          },
        ]
      );

      setQuestion("");

      try {

        setLoading(true);

        const response =
          await askQuestion(
            currentQuestion,
            workspaceId
          );

        setMessages(
          (prev) => [
            ...prev,
            {
              role:
                "assistant",
              content:
                response.answer ||
                "No answer received",
            },
          ]
        );

      } catch (error) {

        console.log(error);

        setMessages(
          (prev) => [
            ...prev,
            {
              role:
                "assistant",
              content:
                "An error occurred while generating the answer.",
            },
          ]
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div
      className="
        flex
        flex-col
        gap-4
      "
    >

      <div
        className="
          h-[500px]
          overflow-y-auto
          border
          rounded-lg
          p-4
          bg-slate-900
        "
      >

        {messages.length === 0 && (
          <p>
            Ask a question
            about your
            uploaded documents.
          </p>
        )}

        {messages.map(
          (
            message,
            index
          ) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          )
        )}

        {loading && (

          <div
            className="
              bg-slate-800
              text-white
              p-3
              rounded-lg
              max-w-[80%]
            "
          >
            Thinking...
          </div>

        )}

      </div>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
        placeholder="Ask a question..."
        className="
          w-full
          bg-slate-800
          text-white
          rounded-xl
          border
          border-slate-700
          rounded-lg
          p-4
        "
      />

      <button
        onClick={
          handleAsk
        }
        disabled={loading || !question.trim()}
        className="
          bg-blue-600
          hover:bg-blue-700
          disabled:opacity-50
          disabled:cursor-not-allowed
          text-white
          px-6
          py-3
          rounded-xl
          transition
        "
      >
        {loading
          ? "Thinking..."
          : "Ask"}
      </button>

    </div>
  );
}