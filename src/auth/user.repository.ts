import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(signupDto: SignupDto): Promise<void> {
		const { UID, nickname, password } = signupDto;

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({ UID, nickname, password: hashedPassword });

		try {
			await this.save(user);
		} catch (error) {
			if (error.errno === 1062) {
				throw new ConflictException('이미 존재하는 아이디나 닉네임입니다.');
			} else {
				throw new InternalServerErrorException();
			}
		}
	}
}
