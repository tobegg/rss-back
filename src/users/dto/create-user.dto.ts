import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Incorrect email format' })
  readonly email: string;
  @ApiProperty({ example: '123456', description: 'Password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 16, { message: 'Length should be from 4 to 16 symbols' })
  readonly password: string;
}
