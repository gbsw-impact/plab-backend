import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserInfo() {
    return 'user main page';
  }

  async register(password: string, userid: string) {
    const existedUser = await this.userRepository.findOne({
      where: {
        userid: userid,
      },
    });

    if (existedUser) {
      throw new BadRequestException('이미 등록된 사용자입니다.');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.save({
      password: hashedPassword,
      userid: userid,
    });

    return user;
  }
}
