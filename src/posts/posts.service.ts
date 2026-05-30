import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { toPostResponse, type PostResponse } from './mappers/post.mapper';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  async create(input: CreatePostDto): Promise<PostResponse> {
    await this.usersService.assertExists(input.userId);

    const post = this.postsRepository.create({
      title: input.title,
      content: input.content,
      user: { id: input.userId },
    });

    const saved = await this.postsRepository.save(post);
    return toPostResponse(saved, input.userId);
  }

  async findAll(): Promise<PostResponse[]> {
    const posts = await this.postsRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });

    return posts.map((post) => toPostResponse(post));
  }

  async findByUserId(userId: string): Promise<PostResponse[]> {
    await this.usersService.assertExists(userId);

    const posts = await this.postsRepository.find({
      where: { user: { id: userId } },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });

    return posts.map((post) => toPostResponse(post));
  }

  async remove(id: string): Promise<void> {
    const result = await this.postsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }
}
