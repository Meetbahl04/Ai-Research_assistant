import { Router } from "express";

import {
  createWorkspaceController,
  getUserWorkspacesController,
} from "./workspace.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createWorkspaceController
);

router.get(
  "/",
  authMiddleware,
  getUserWorkspacesController
);

export default router;