import { Request, Response } from "express";

import {
  uploadDocumentService,
  getWorkspaceDocumentsService,
} from "./document.service.js";

import { getEmbedding }
from "../../utils/embeddings.utils.js";

import { storeChunkEmbedding }
from "../../utils/vector.utils.js";

import { extractTextFromPDF } from "../../utils/pdf.utils.js";

import { chunkText } from "../../utils/chunk.utils.js";

export const uploadDocumentController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const file = req.file;

      const { workspaceId } = req.body;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const extractedText =
        await extractTextFromPDF(file.path);
      
      console.log("TEXT START");
      console.log(extractedText.substring(0, 500));
      console.log("TEXT END");
      
      const chunks =
        chunkText(extractedText);
      const document =
        await uploadDocumentService({
          filename: file.filename,
          filepath: file.path,
          mimetype: file.mimetype,
          size: file.size,
          workspaceId,
        });
        for (let i = 0; i < chunks.length; i++) {

          const chunk = chunks[i];

        const embedding =
          await getEmbedding(chunk) as number[];

          await storeChunkEmbedding({
            content: chunk,
            embedding,
            chunkIndex: i,
            documentId: document.id,
          });
}

      res.status(201).json({
        success: true,
        data: document, extractedText, totalChunks: chunks.length, chunks,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getWorkspaceDocumentsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const workspaceId = req.params.workspaceId as string;

      const documents =
        await getWorkspaceDocumentsService(
          workspaceId
        );

      res.status(200).json({
        success: true,
        data: documents,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };