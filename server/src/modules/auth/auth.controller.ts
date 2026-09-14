import { Request, Response } from "express";
import {
  signupService,
  loginService,
} from "./auth.service.js";

export const signupController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const result = await signupService(
      name,
      email,
      password
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(
      email,
      password
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};