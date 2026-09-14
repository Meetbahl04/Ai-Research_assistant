import { Response } from "express";

import { AuthRequest } from "../../middleware/auth.middleware.js";

import {
  createWorkspaceService,
  getUserWorkspacesService,
} from "./workspace.service.js";

export const createWorkspaceController =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const { name } = req.body;

      const workspace =
        await createWorkspaceService(
          name,
          req.userId as string
        );

      res.status(201).json({
        success: true,
        data: workspace,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

export const getUserWorkspacesController =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const workspaces =
        await getUserWorkspacesService(
          req.userId as string
        );

      res.status(200).json({
        success: true,
        data: workspaces,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };