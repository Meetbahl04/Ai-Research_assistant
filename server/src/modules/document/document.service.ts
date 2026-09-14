import prisma from "../../config/prisma.js";

interface UploadDocumentInput {
  filename: string;
  filepath: string;
  mimetype: string;
  size: number;
  workspaceId: string;
}

export const uploadDocumentService =
  async (
    data: UploadDocumentInput
  ) => {
    const document =
      await prisma.document.create({
        data,
      });

    return document;
  };

export const getWorkspaceDocumentsService =
  async (workspaceId: string) => {
    const documents =
      await prisma.document.findMany({
        where: {
          workspaceId,
        },
        orderBy: {
          uploadedAt: "desc",
        },
      });

    return documents;
  };