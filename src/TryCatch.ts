import { NextFunction, Request, RequestHandler, Response } from "express";

const TryCatch = (handler : RequestHandler) : RequestHandler => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
           await handler(req, res, next);
        } catch (error : unknown) {
            if(error instanceof Error){
                res.status(500).json({
                    message: error.message
                })
            } else {
                res.status(500).json({
                    message: "Unknown error occurred"
                })
            }
          
        }
    }
}
export default TryCatch;

