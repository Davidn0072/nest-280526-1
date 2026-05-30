import type { CreatePostInput } from './posts.service';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(body: CreatePostInput): Promise<import("./posts.service").PostResponse>;
    findAll(): Promise<import("./posts.service").PostResponse[]>;
    findByUser(userId: string): Promise<import("./posts.service").PostResponse[]>;
    remove(id: string): Promise<void>;
}
