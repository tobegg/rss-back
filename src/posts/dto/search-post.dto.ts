import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SearchPostDto {
  @ApiProperty({ example: 'search', description: 'Search value' })
  @IsString({ message: 'Should be a string' })
  readonly search: string;

  @ApiProperty({ example: 'house', description: 'Category' })
  @IsString({ message: 'Should be a string' })
  readonly filter: string;

  @ApiProperty({ example: '2', description: 'Page value' })
  @IsNumber({}, { message: 'Should be a number' })
  readonly page: number;

  @ApiProperty({ example: '5', description: 'Limit value' })
  @IsNumber({}, { message: 'Should be a number' })
  readonly limit: number;
}
