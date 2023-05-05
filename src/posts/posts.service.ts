import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
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

  async findAll(searchDto: SearchPostDto) {
    const posts = await this.postRepository.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${searchDto.search}%` } },
          { description: { [Op.like]: `%${searchDto.search}%` } },
        ],
        categories: { [Op.like]: `%${searchDto.filter}%` },
      },
      limit: searchDto.limit,
      include: { all: true },
      offset: (searchDto.page - 1) * searchDto.limit,
      order: [['id', 'DESC']],
      distinct: true,
    });
    return posts;
  }

  async remove(id: number) {
    await this.postRepository.destroy({ where: { id } });
    return `Post: ${id} was deleted`;
  }

  async count() {
    return await this.postRepository.count();
  }

  async update(id: number, postDto: CreatePostDto) {
    try {
      const post = await this.postRepository.update(
        { title: postDto.title, description: postDto.description },
        { where: { id } },
      );
      return post;
    } catch (e) {
      console.log(e);
    }
  }
}
