import { Request, Response } from 'express';
export declare const getSalesLeads: (req: Request, res: Response) => Promise<void>;
export declare const getPendingLoans: (req: Request, res: Response) => Promise<void>;
export declare const updateSanctionStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getApprovedLoans: (req: Request, res: Response) => Promise<void>;
export declare const markDisbursed: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDisbursedLoans: (req: Request, res: Response) => Promise<void>;
export declare const recordPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=dashboardController.d.ts.map