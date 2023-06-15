import admin from "@/config/firebase";
import { Response, Request, NextFunction } from "express";

export default async function validateFirebaseToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization as string;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userFirebaseId = decodedToken.uid
    next();
  } catch (e) {
    throw new Error("UNAUTHORIZED");
  }
}

export type AuthenticatedRequest = Request & FBUserId;

type FBUserId = {
  userFirebaseId: string;
};
