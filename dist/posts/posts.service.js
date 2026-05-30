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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const post_entity_1 = require("./post.entity");
let PostsService = class PostsService {
    postsRepository;
    usersRepository;
    constructor(postsRepository, usersRepository) {
        this.postsRepository = postsRepository;
        this.usersRepository = usersRepository;
    }
    async create(input) {
        const user = await this.usersRepository.findOne({
            where: { id: input.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${input.userId} not found`);
        }
        const post = this.postsRepository.create({
            title: input.title,
            content: input.content,
            user,
        });
        const saved = await this.postsRepository.save(post);
        return this.toResponse(saved, user.id);
    }
    async findAll() {
        const posts = await this.postsRepository.find({
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
        return posts.map((post) => this.toResponse(post));
    }
    async findByUserId(userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const posts = await this.postsRepository.find({
            where: { user: { id: userId } },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
        return posts.map((post) => this.toResponse(post));
    }
    async remove(id) {
        const result = await this.postsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
    }
    toResponse(post, userId) {
        const resolvedUserId = userId ?? post.user?.id;
        if (!resolvedUserId) {
            throw new Error('Post is missing user relation');
        }
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            userId: resolvedUserId,
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map