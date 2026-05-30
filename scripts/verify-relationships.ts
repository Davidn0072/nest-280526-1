import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Post } from '../src/posts/post.entity';
import { User } from '../src/users/user.entity';

config();

async function verify(): Promise<void> {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Post],
    synchronize: false,
  });

  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);
  const postRepository = dataSource.getRepository(Post);

  const email = `phase4-test-${Date.now()}@example.com`;

  const user = await userRepository.save({
    name: 'Phase4 User',
    email,
    password: 'test123',
  });

  await postRepository.save({
    title: 'Phase4 Post',
    content: 'Relationship test content',
    user,
  });

  const userWithPosts = await userRepository.findOne({
    where: { id: user.id },
    relations: { posts: true },
  });

  const postWithUser = await postRepository.findOne({
    where: { title: 'Phase4 Post' },
    relations: { user: true },
  });

  if (!userWithPosts?.posts?.length) {
    throw new Error('OneToMany: user.posts is empty');
  }

  if (postWithUser?.user?.id !== user.id) {
    throw new Error('ManyToOne: post.user does not match');
  }

  await postRepository.delete({ user: { id: user.id } });
  await userRepository.delete({ id: user.id });

  await dataSource.destroy();

  console.log('Phase 4 OK: OneToMany and ManyToOne join queries work');
}

verify().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
