import express from "express";

import {
  askQuestionController,
} from "./chat.controller.js";

const router = express.Router();

router.post(
  "/ask",
  askQuestionController
);

export default router;