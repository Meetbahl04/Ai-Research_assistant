import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import workspaceRoutes from "../modules/workspace/workspace.routes.js";

import documentRoutes from "../modules/document/document.routes.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

router.get(
  "/protected",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Protected route accessed",
    });
  }
);

router.use("/auth", authRoutes);

router.use(
  "/workspaces",
  workspaceRoutes
);

router.use("/documents", documentRoutes);

export default router;