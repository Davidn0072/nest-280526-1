import { User } from '../user.entity';

export type UserResponse = Pick<User, 'id' | 'name' | 'email' | 'createdAt'>;

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}
