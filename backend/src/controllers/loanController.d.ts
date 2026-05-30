import { Request, Response } from 'express';
export declare const savePersonalDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const uploadSalarySlip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const applyLoan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyLoans: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=loanController.d.ts.map