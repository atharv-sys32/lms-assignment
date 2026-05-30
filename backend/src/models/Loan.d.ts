import mongoose from 'mongoose';
export declare enum LoanStatus {
    Draft = "Draft",// Before "Apply" is clicked, perhaps? But instructions say on Apply -> pending.
    Pending = "Pending",// Applied
    Approved = "Approved",// Sanctioned
    Rejected = "Rejected",// Rejected by Sanction
    Disbursed = "Disbursed",// Disbursed
    Closed = "Closed"
}
export declare const Loan: mongoose.Model<{
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    borrower: mongoose.Types.ObjectId;
    amount: number;
    tenure: number;
    interestRate: number;
    totalRepayment: number;
    status: LoanStatus;
    rejectionReason?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Loan.d.ts.map