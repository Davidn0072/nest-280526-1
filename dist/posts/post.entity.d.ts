import { User } from '../users/user.entity';
export declare class Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: User;
}
