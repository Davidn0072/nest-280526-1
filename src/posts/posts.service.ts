import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from './post.entity';

export type CreatePostInput = {
  title: string;
  content: string;
  userId: string;
};

export type PostResponse = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
};

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: CreatePostInput): Promise<PostResponse> {
    const user = await this.usersRepository.findOne({
      where: { id: input.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${input.userId} not found`);
    }

    const post = this.postsRepository.create({
      title: input.title,
      content: input.content,
      user,
    });

    const saved = await this.postsRepository.save(post);
    return this.toResponse(saved, user.id);
  }

  async findAll(): Promise<PostResponse[]> {
    const posts = await this.postsRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });

    return posts.map((post) => this.toResponse(post));
  }

  async findByUserId(userId: string): Promise<PostResponse[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const posts = await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });

    return posts.map((post) => this.toResponse(post));
  }

  async remove(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  private toResponse(post: Post, userId?: string): PostResponse {
    const resolvedUserId = userId ?? post.user?.id;

    if (!resolvedUserId) {
      throw new Error('Post is missing user relation');
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      userId: resolvedUserId,
    };
  }
}
