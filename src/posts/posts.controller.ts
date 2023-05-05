import { Controller, Body, Post, Param, Delete, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from './entities/post.entity';
import { SearchPostDto } from './dto/search-post.dto';
import { ResponsePostDto } from './dto/response-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Post creation' })
  @ApiResponse({ status: 200, type: PostEntity })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Delete Post by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @ApiOperation({ summary: 'All Posts getting' })
  @ApiResponse({ status: 200, type: ResponsePostDto })
  @Post('/search')
  findAll(@Body() filter: SearchPostDto) {
    return this.postsService.findAll(filter);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
}
