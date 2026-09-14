import { GoogleGenerativeAI }
from "@google/generative-ai";

console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY
);

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

export const generateAnswer =
  async (
    question: string,
    context: string
  ) => {

    const prompt = `
You are an AI research assistant.

Answer ONLY from the provided context.

If the answer is not in the context,
say:
"I could not find that information in the uploaded documents."

Context:
${context}

Question:
${question}
`;

    const result =
      await model.generateContent(
        prompt
      );

    return result.response.text();
  };