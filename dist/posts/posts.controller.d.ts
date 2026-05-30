import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(body: CreatePostDto): Promise<import("./posts.service").PostResponse>;
    findAll(): Promise<import("./posts.service").PostResponse[]>;
    findByUser(userId: string): Promise<import("./posts.service").PostResponse[]>;
    remove(id: string): Promise<void>;
}
