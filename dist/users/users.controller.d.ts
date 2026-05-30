import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: CreateUserDto): Promise<import("./mappers/user.mapper").UserResponse>;
    findAll(): Promise<import("./mappers/user.mapper").UserResponse[]>;
    findOne(id: string): Promise<import("./mappers/user.mapper").UserResponse>;
    remove(id: string): Promise<void>;
}
