import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { toUserResponse, type UserResponse } from './mappers/user.mapper';
import { User } from './user.entity';

const BCRYPT_SALT_ROUNDS = 10;

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
} as const;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: CreateUserDto): Promise<UserResponse> {
    const passwordHash = await bcrypt.hash(input.password, BCRYPT_SALT_ROUNDS);
    const user = this.usersRepository.create({
      name: input.name,
      email: input.email,
      password: passwordHash,
    });
    const saved = await this.usersRepository.save(user);
    return toUserResponse(saved);
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersRepository.find({ select: USER_SELECT });
    return users;
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: USER_SELECT,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async assertExists(id: string): Promise<void> {
    const exists = await this.usersRepository.existsBy({ id });

    if (!exists) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
