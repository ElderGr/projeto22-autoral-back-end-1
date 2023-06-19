import userService from "@/services/users.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function createUser(req:Request, res:Response, next:NextFunction) {
    const userFirebaseId = req.userFirebaseId as string;
    try {
        const new_user = userService.createUser(userFirebaseId)
        res.status(httpStatus.CREATED).send(new_user)
    } catch (e) {
        console.log(e);
        throw e
    }
}