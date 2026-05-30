import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
export type PostResponse = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
};
export declare class PostsService {
    private readonly postsRepository;
    private readonly usersRepository;
    constructor(postsRepository: Repository<Post>, usersRepository: Repository<User>);
    create(input: CreatePostDto): Promise<PostResponse>;
    findAll(): Promise<PostResponse[]>;
    findByUserId(userId: string): Promise<PostResponse[]>;
    remove(id: string): Promise<void>;
    private toResponse;
}
