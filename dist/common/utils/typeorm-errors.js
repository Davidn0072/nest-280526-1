"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostgresErrorCode = getPostgresErrorCode;
exports.isUniqueViolation = isUniqueViolation;
exports.isForeignKeyViolation = isForeignKeyViolation;
const typeorm_1 = require("typeorm");
function getPostgresErrorCode(error) {
    if (!(error instanceof typeorm_1.QueryFailedError)) {
        return undefined;
    }
    const driverError = error.driverError;
    return driverError?.code ?? error.code;
}
function isUniqueViolation(error) {
    return getPostgresErrorCode(error) === '23505';
}
function isForeignKeyViolation(error) {
    return getPostgresErrorCode(error) === '23503';
}
//# sourceMappingURL=typeorm-errors.js.map