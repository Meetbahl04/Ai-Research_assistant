import { Router } from "express";

import {
  uploadDocumentController,
  getWorkspaceDocumentsController,
} from "./document.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

import { upload } from "../../middleware/upload.middleware.js";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadDocumentController
);

router.get(
  "/:workspaceId",
  authMiddleware,
  getWorkspaceDocumentsController
);

export default router;