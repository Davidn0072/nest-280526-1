import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from './post.entity';
export type CreatePostInput = {
    title: string;
    content: string;
    userId: string;
};
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
    create(input: CreatePostInput): Promise<PostResponse>;
    findAll(): Promise<PostResponse[]>;
    findByUserId(userId: string): Promise<PostResponse[]>;
    remove(id: string): Promise<void>;
    private toResponse;
}
