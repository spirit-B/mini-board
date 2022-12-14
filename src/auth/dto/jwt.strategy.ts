import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
	) {
		super({
			secretOrKey: 'Secret1234', // token이 유효한지 확인하기 위해 필요함.
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload) {
		const { UID } = payload;
		const user: User = await this.userRepository.findOneBy({ UID });

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
