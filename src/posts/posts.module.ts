import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { RssService } from './rss.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, RssService],
  imports: [SequelizeModule.forFeature([Post])],
  exports: [PostsService, RssService],
})
export class PostsModule {}
