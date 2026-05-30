import mongoose from 'mongoose';
export declare enum UserRole {
    Admin = "Admin",
    Sales = "Sales",
    Sanction = "Sanction",
    Disbursement = "Disbursement",
    Collection = "Collection",
    Borrower = "Borrower"
}
export declare const User: mongoose.Model<{
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email: string;
    password: string;
    role: UserRole;
    fullName?: string | null | undefined;
    pan?: string | null | undefined;
    dob?: NativeDate | null | undefined;
    monthlySalary?: number | null | undefined;
    employmentMode?: "Salaried" | "Self-Employed" | "Unemployed" | null | undefined;
    salarySlipUrl?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=User.d.ts.map