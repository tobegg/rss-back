import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { ResponseLoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: ResponseLoginDto })
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
