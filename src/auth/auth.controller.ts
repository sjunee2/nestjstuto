import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dtos/sign.request.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-up')
    async signUp(@Body() signUpDto: SignUpRequestDto) {
        return await this.authService.signUp(signUpDto);
    }

    @Post('/sign-in')
    async signIn(@Body() signInDto: SignInRequestDto) {
        return await this.authService.signIn(signInDto);
    }
    /*
    @Post('/refresh')
    async refresh(@Body() refreshToken: { refresh_token: string }) {
        return await this.authService.updateToken(refreshToken);
    }
    */
    //refresh token API 설정
}
