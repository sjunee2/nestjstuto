import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequestDto, SignInRequestDto } from './dtos/sign.request.dto';
import { TokenResponseDto } from './dtos/token.response.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(signUpDto: SignUpRequestDto) {
        const newUser = await this.userService.addUser(signUpDto);
        if (!newUser) {
            return false;
        }
        return true;
    }

    async signIn(signInDto: SignInRequestDto): Promise<TokenResponseDto> {
        const { email, password } = signInDto;
        const user = await this.userService.findByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException();
        }

        const payload: JwtPayload = { id: user.id };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '1h',
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
        });
        await this.userService.updateToken(email, refresh_token);
        return { access_token, refresh_token };
    }
}
