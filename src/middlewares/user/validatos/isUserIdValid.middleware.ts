import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

import { ResponseStatusCodesEnum } from '../../../constants/enums';
import { ErrorHandler } from '../../../errors';
import { userIdValidator } from '../../../validators';

export const isUserIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const {error} = Joi.validate(req.params, userIdValidator);

    if (error) {
        return next(new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
