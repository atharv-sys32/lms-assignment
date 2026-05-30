import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/User';
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const authorize: (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map