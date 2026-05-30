"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_errors_1 = require("../utils/typeorm-errors");
let TypeOrmExceptionFilter = class TypeOrmExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        if ((0, typeorm_errors_1.isUniqueViolation)(exception)) {
            const body = new common_1.ConflictException('Resource already exists').getResponse();
            response.status(common_1.HttpStatus.CONFLICT).json(body);
            return;
        }
        if ((0, typeorm_errors_1.isForeignKeyViolation)(exception)) {
            response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Related resource does not exist',
                error: 'Bad Request',
            });
            return;
        }
        const code = (0, typeorm_errors_1.getPostgresErrorCode)(exception);
        const body = new common_1.InternalServerErrorException(code ? `Database error (${code})` : 'Database error').getResponse();
        response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(body);
    }
};
exports.TypeOrmExceptionFilter = TypeOrmExceptionFilter;
exports.TypeOrmExceptionFilter = TypeOrmExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], TypeOrmExceptionFilter);
//# sourceMappingURL=typeorm-exception.filter.js.map