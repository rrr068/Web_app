import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, userId } = createPostDto;
    return await this.prismaService.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }

  async getPosts(userId: number): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      where: { userId },
    });
  }

  async findOnePost(id: number): Promise<Post> {
    return await this.prismaService.post.findUnique({
      where: { id },
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const { title, content } = updatePostDto;
    return await this.prismaService.post.update({
      data: { title, content },
      where: { id },
    });
  }

  async deletePost(id: number): Promise<Post> {
    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
