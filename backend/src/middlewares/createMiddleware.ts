import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class CreateMiddleware implements NestMiddleware {
  async use(req: Request & any, res: Response, next: NextFunction) {
    next();
  }
}