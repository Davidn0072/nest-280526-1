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
const users_service_1 = require("../users/users.service");
const post_mapper_1 = require("./mappers/post.mapper");
const post_entity_1 = require("./post.entity");
let PostsService = class PostsService {
    postsRepository;
    usersService;
    constructor(postsRepository, usersService) {
        this.postsRepository = postsRepository;
        this.usersService = usersService;
    }
    async create(input) {
        await this.usersService.assertExists(input.userId);
        const post = this.postsRepository.create({
            title: input.title,
            content: input.content,
            user: { id: input.userId },
        });
        const saved = await this.postsRepository.save(post);
        return (0, post_mapper_1.toPostResponse)(saved, input.userId);
    }
    async findAll() {
        const posts = await this.postsRepository.find({
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
        return posts.map((post) => (0, post_mapper_1.toPostResponse)(post));
    }
    async findByUserId(userId) {
        await this.usersService.assertExists(userId);
        const posts = await this.postsRepository.find({
            where: { user: { id: userId } },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
        return posts.map((post) => (0, post_mapper_1.toPostResponse)(post));
    }
    async remove(id) {
        const result = await this.postsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Post with id ${id} not found`);
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], PostsService);
//# sourceMappingURL=posts.service.js.map