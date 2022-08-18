import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../../database/prismaClient";
import { CustomError } from "../errors/CustomError";
import jwt_decode from "jwt-decode";

export type Token = {
  userId: string | null;
};

export type TokenDecoded = {
  user: string;
};

export const getToken = (authorization: string) => {
  const tokenDecoded: TokenDecoded = jwt_decode(authorization);
  const userId = tokenDecoded.user;

  if (!userId) {
    return {
      userId: null,
    };
  }

  return {
    userId: userId,
  };
};

export const getUser = async (token: string) => {
  const { userId } = getToken(token);

  if (!userId) {
    return null;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      id: userId,
    },
  });

  return user;
};

export const auth = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) throw new CustomError("Unauthorized", 401);

    const user = await getUser(authorization);

    if (!user) throw new CustomError("Unauthorized", 401);

    request.user = user;

    next();
  } catch (err) {
    if (err instanceof CustomError) {
      response.status(err.status).json({ message: err.message });
    }
  }
};
