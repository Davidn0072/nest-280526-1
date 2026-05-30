import { User } from '../user.entity';
export type UserResponse = Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;
export declare function toUserResponse(user: User): UserResponse;
