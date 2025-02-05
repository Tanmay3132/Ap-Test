import { API_KEY } from "@/config";
import { NextFunction, Request, Response } from "express";
import { HttpException } from '@exceptions/HttpException';


export const apiKeyAuthenticationMiddleware = ( req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey : string | undefined = req.headers['api_key'] as string;
        if(!apiKey){
            throw new HttpException(401, 'API Key is missing');
        }
        if(apiKey !==API_KEY){
            throw new HttpException(403, "Invalid Api Key!");
        }
        next();
    } catch (error) {
        next(error);
    }
};