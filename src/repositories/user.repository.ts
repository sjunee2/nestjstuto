import { HttpException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRequestDto } from "src/user/dtos/user.request.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.exists({ where: { email}})
    return user;
  }

  async create(info: UserRequestDto): Promise<UserEntity> {
    if (!(await this.existsByEmail(info.email))) {
    const user = this.userRepository.create(info);
    return await this.userRepository.save(user);
    } else {
      throw new HttpException('User already exists', 409);
    }
  }

  async deleteByEmail(email: string): Promise<void> {
    if (await this.existsByEmail(email)) {
      await this.userRepository.delete({ email });
    } else {
      throw new HttpException('User not found', 404);
    }
  }

  async updatePassword(email: string, password: string): Promise<void> {
    if (await this.existsByEmail(email)) {
      await this.userRepository.update({ email }, { password });
    } else {
      throw new HttpException('User not found', 404);
    }
  }

  async updateToken(email: string, token: string): Promise<void> {
    if (await this.existsByEmail(email)) {
      await this.userRepository.update({ email }, { token });
    } else {
      throw new HttpException('User not found', 404);
    }
  }

  async findByVal(key: keyof UserEntity, val: any): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { [key]: val } });
    return user;
  }
}