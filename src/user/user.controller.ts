import { Controller, Get, Post, Delete, Body, Put, UseFilters, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { EmailRequestDto, PasswordRequestDto, UserRequestDto } from './dtos/user.request.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { AccessGuard } from 'src/auth/guard/access.guard';
import { JwtPayload } from 'src/interfaces/jwt.payload';
import { Request } from 'express';

@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(AccessGuard)
    async getUser(@Req() req: Request): Promise<UserResponseDto> {
        const { id } = req.user as JwtPayload;
        return this.userService.findByVal('id', id);
    }
    
    @Get()
    async getUsers(): Promise<UserResponseDto[]> {
        return await this.userService.getUsers();
    }

    @Post()
    async addUser(@Body() body: UserRequestDto): Promise<UserResponseDto> {
        return await this.userService.addUser(body);
    }

    @Delete()
    async deleteUser(@Body() body: EmailRequestDto): Promise<void> {
        return await this.userService.deleteUser(body);
    }

    @Get('/find')
    async findByEmail(@Body() body: EmailRequestDto): Promise<UserResponseDto> {
        return await this.userService.findByEmail(body);
    }

    @Put('/password')
    async updatePassword(@Body() body: PasswordRequestDto): Promise<void> {
        return await this.userService.updatePassword(body);
    }
}
