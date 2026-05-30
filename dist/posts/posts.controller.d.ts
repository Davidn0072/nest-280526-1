import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(body: CreatePostDto): Promise<import("./mappers/post.mapper").PostResponse>;
    findAll(): Promise<import("./mappers/post.mapper").PostResponse[]>;
    findByUser(userId: string): Promise<import("./mappers/post.mapper").PostResponse[]>;
    remove(id: string): Promise<void>;
}
