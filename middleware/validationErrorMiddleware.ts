import { validationResult } from "express-validator";
import {Request, Response, NextFunction, Handler} from "express";

const validationErrorMiddleware : Handler = (req : Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const result = errors.formatWith(error => error.msg).array();
            res.status(400).json(result);
            return;
        };
        next();
};

export {validationErrorMiddleware};