import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export type UserResponse = Omit<User, 'password'>;
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(input: CreateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findOne(id: string): Promise<UserResponse>;
    remove(id: string): Promise<void>;
    private omitPassword;
}
