import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('/login')
  login(@Body() dto: User) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register' })
  @Post('/register')
  register(@Body() dto: User) {
    return this.authService.register(dto);
  }
}
