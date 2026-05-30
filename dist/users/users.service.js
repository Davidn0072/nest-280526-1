"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(input) {
        try {
            const user = this.usersRepository.create(input);
            const saved = await this.usersRepository.save(user);
            return this.omitPassword(saved);
        }
        catch (error) {
            if (error instanceof typeorm_2.QueryFailedError &&
                error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async findAll() {
        const users = await this.usersRepository.find({
            select: { id: true, name: true, email: true, createdAt: true },
        });
        return users;
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: { id: true, name: true, email: true, createdAt: true },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async remove(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
    }
    omitPassword(user) {
        const { password: _, ...rest } = user;
        return rest;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map