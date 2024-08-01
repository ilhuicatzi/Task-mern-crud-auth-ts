import {z, ZodError} from 'zod';
import {Request, Response, NextFunction} from 'express';

export const validateSchema = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message: (error as ZodError).message });
    }
  };
}