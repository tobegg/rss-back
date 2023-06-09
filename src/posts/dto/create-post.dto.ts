import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Title', description: 'Title' })
  @IsString({ message: 'Should be a string' })
  readonly title: string;

  @ApiProperty({ example: 'Description', description: 'Description' })
  @IsString({ message: 'Should be a string' })
  readonly description: string;

  @ApiProperty({ example: 'home|google', description: 'Categories' })
  @IsString({ message: 'Should be a string' })
  readonly categories: string;

  @ApiProperty({
    example: 'https://example.com/test.jpg',
    description: 'Image url',
  })
  @IsString({ message: 'Should be a string' })
  readonly image: string;

  @ApiProperty({ example: 'Name LastName', description: 'Author name' })
  @IsString({ message: 'Should be a string' })
  readonly author: string;
}
