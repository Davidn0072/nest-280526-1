import { Repository } from 'typeorm';
import { User } from './user.entity';
export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
};
export type UserResponse = Omit<User, 'password'>;
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(input: CreateUserInput): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findOne(id: string): Promise<UserResponse>;
    remove(id: string): Promise<void>;
    private omitPassword;
}
