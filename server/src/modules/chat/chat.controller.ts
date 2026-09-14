import { Request, Response } from "express";

import { getEmbedding }
from "../../utils/embeddings.utils.js";

import { searchSimilarChunks }
from "../../utils/search.utils.js";

import { generateAnswer }
from "../../utils/llm.utils.js";

export const askQuestionController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        question,
        workspaceId,
      } = req.body;

      if (!question || !workspaceId) {

        return res.status(400).json({
          success: false,
          message:
            "Question and workspaceId required",
        });
      }

      const queryEmbedding =
        await getEmbedding(question);

      const chunks: any =
        await searchSimilarChunks({
          embedding:
            queryEmbedding as number[],
          workspaceId,
        });

      const context =
        chunks
          .map(
            (chunk: any) =>
              chunk.content
          )
          .join("\n\n");

      const answer =
        await generateAnswer(
          question,
          context
        );

      return res.status(200).json({
        success: true,
        question,
        answer,
        matches: chunks,
      });

    } catch (error: any) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };