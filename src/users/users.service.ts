import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export type UserResponse = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: CreateUserInput): Promise<UserResponse> {
    try {
      const user = this.usersRepository.create(input);
      const saved = await this.usersRepository.save(user);
      return this.omitPassword(saved);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as QueryFailedError & { code?: string }).code === '23505'
      ) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersRepository.find({
      select: { id: true, name: true, email: true, createdAt: true },
    });
    return users;
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  private omitPassword(user: User): UserResponse {
    const { password: _, ...rest } = user;
    return rest;
  }
}
