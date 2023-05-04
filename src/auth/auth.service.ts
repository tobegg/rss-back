import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: User) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async register(dto: User) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const newUser = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(newUser);
  }

  generateToken(user: User) {
    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  private async validateUser(dto: User) {
    const user = await this.userService.getUserByEmail(dto.email);
    const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);

    if (user && isPasswordCorrect) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }
}
