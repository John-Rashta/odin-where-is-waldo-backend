import { validationResult } from "express-validator";
import * as express from "express";

module.exports.basicErrorMiddleware = (req : express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const result = errors.formatWith(error => error.msg).array();
            return res.status(400).json(result);
        };
        next();
};