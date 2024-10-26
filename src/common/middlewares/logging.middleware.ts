import { NextFunction, Request, Response } from "express";

export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('Lal: ', req.method, req.url, req.body)
    next()
}