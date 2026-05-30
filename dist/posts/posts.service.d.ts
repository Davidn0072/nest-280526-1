import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { type PostResponse } from './mappers/post.mapper';
import { Post } from './post.entity';
export declare class PostsService {
    private readonly postsRepository;
    private readonly usersService;
    constructor(postsRepository: Repository<Post>, usersService: UsersService);
    create(input: CreatePostDto): Promise<PostResponse>;
    findAll(): Promise<PostResponse[]>;
    findByUserId(userId: string): Promise<PostResponse[]>;
    remove(id: string): Promise<void>;
}
