import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
		private jwtService: JwtService
	) {}

	async signUp(signupDto: SignupDto): Promise<void> {
		return this.userRepository.createUser(signupDto);
	}

	async signIn(signinDto: SigninDto): Promise<{ accessToken: string }> {
		const { UID, password } = signinDto;
		const user = await this.userRepository.findOneBy({ UID });

		if (user && (await bcrypt.compare(password, user.password))) {
			// 유저 토큰 생성 (Secret + Payload)
			const payload = { UID };
			const accessToken = await this.jwtService.sign(payload);

			return { accessToken };
		} else {
			throw new UnauthorizedException('아이디나 비밀번호를 확인하세요.');
		}
	}
}
