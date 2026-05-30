import { Post } from '../posts/post.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    posts: Post[];
}
