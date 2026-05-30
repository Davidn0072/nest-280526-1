import type { CreateUserInput } from './users.service';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(body: CreateUserInput): Promise<import("./users.service").UserResponse>;
    findAll(): Promise<import("./users.service").UserResponse[]>;
    findOne(id: string): Promise<import("./users.service").UserResponse>;
    remove(id: string): Promise<void>;
}
