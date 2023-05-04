import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(postDto: CreatePostDto) {
    try {
      const post = await this.postRepository.create(postDto);
      return post;
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
    return posts;
  }

  async count() {
    return await this.postRepository.count();
  }
  /* 
  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  } */
}
