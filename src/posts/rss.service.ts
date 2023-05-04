import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as Parser from 'rss-parser';
import { PostsService } from './posts.service';

@Injectable()
export class RssService implements OnApplicationBootstrap {
  constructor(private readonly postsService: PostsService) {}

  async onApplicationBootstrap() {
    await this.fetchRss();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async fetchRss() {
    const count = await this.postsService.count();

    if (count === 0) {
      const parser = new Parser();
      const posts = await parser.parseURL('https://lifehacker.com/rss');

      posts.items.forEach((item) => {
        this.postsService.create({
          title: item.title,
          description: item.contentSnippet,
          categories: item.categories,
          image: '',
          author: item.creator,
        });
      });
    }
  }
}
