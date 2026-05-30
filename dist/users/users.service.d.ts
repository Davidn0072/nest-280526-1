import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { type UserResponse } from './mappers/user.mapper';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(input: CreateUserDto): Promise<UserResponse>;
    findAll(): Promise<UserResponse[]>;
    findOne(id: string): Promise<UserResponse>;
    assertExists(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
