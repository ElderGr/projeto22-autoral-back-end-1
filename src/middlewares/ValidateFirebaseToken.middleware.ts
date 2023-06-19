import admin from "@/config/firebase";
import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";

declare module "express-serve-static-core" {
  interface Request {
    userFirebaseId?: string;
  }
  interface Response {
    userFirebaseId?: string;
  }
}

export default async function validateFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header('Authorization') as string;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userFirebaseId = decodedToken.uid
    return next();
  } catch (e) {
    return generateUnauthorizedResponse(res)
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(new Error('Unauthorized Error'));
}
