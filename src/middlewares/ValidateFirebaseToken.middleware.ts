import userService from "@/services/users.service";
import { Response, Request, NextFunction } from "express";
import httpStatus from "http-status";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number;
    userFirebaseId: string;
  }
  interface Response {
    userId?: number;
    userFirebaseId: string;
  }
}

export default async function validateFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const firebaseUID = req.header("Authorization") as string;
  try {
    const user = await userService.findUserByFirebaseId(firebaseUID)
    if (user?.id) req.userId = user.id;
    req.userFirebaseId = firebaseUID;
    console.log("passou");
    
    return next();
  } catch (e) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(new Error("Unauthorized Error"));
}
