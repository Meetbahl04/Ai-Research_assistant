import { api } from "./api";

export const askQuestion =
  async (
    question: string,
    workspaceId: string
  ) => {

    const res =
      await api.post(
        "/chat/ask",
        {
          question,
          workspaceId,
        }
      );

    return res.data;
  };