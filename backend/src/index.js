"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const auth_1 = __importDefault(require("./routes/auth"));
const loan_1 = __importDefault(require("./routes/loan"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static('uploads')); // for salary slip
(0, db_1.connectDB)();
app.use('/api/auth', auth_1.default);
app.use('/api/loan', loan_1.default);
app.use('/api/dashboard', dashboard_1.default);
app.listen(env_1.ENV.PORT, () => {
    console.log(`Server running on port ${env_1.ENV.PORT}`);
});
//# sourceMappingURL=index.js.map