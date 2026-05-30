import mongoose from 'mongoose';
export declare const Payment: mongoose.Model<{
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    date: NativeDate;
    amount: number;
    loan: mongoose.Types.ObjectId;
    utrNumber: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=Payment.d.ts.map