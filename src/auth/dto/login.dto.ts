import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResponseLoginDto {
  @ApiProperty({ example: '1esd', description: 'Jwt token' })
  @IsString({ message: 'Should be a string' })
  readonly token: string;
}
