import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: CreateUserDto): Promise<import("./users.service").UserResponse>;
    findAll(): Promise<import("./users.service").UserResponse[]>;
    findOne(id: string): Promise<import("./users.service").UserResponse>;
    remove(id: string): Promise<void>;
}
