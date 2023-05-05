import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { Post } from '../entities/post.entity';

export class ResponsePostDto {
  @ApiProperty({ example: '1', description: 'Total count' })
  @IsNumber({}, { message: 'Should be a number' })
  readonly count: number;

  @ApiProperty({ example: '[]', description: 'Post list' })
  @IsArray({ message: 'Should be an array' })
  readonly rows: Post[];
}
