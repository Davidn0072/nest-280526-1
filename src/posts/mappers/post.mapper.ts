import { InternalServerErrorException } from '@nestjs/common';
import { Post } from '../post.entity';

export type PostResponse = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
};

export function toPostResponse(post: Post, userId?: string): PostResponse {
  const resolvedUserId = userId ?? post.user?.id;

  if (!resolvedUserId) {
    throw new InternalServerErrorException('Post is missing user relation');
  }

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    userId: resolvedUserId,
  };
}
