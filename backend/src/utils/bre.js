"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEligibility = void 0;
const checkEligibility = (age, salary, employment, pan) => {
    const errors = [];
    if (age < 23 || age > 50)
        errors.push('Age must be between 23 and 50');
    if (salary < 25000)
        errors.push('Salary must be at least ₹25,000 / month');
    if (employment === 'Unemployed')
        errors.push('Applicant is Unemployed');
    // Basic PAN Regex: 5 letters, 4 numbers, 1 letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan))
        errors.push('Does not match valid PAN format');
    return { isValid: errors.length === 0, errors };
};
exports.checkEligibility = checkEligibility;
//# sourceMappingURL=bre.js.map