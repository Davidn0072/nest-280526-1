import { Post } from '../post.entity';
export type PostResponse = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    userId: string;
};
export declare function toPostResponse(post: Post, userId?: string): PostResponse;
