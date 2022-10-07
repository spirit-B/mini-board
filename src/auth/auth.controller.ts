import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/signup')
	signUp(@Body() signupDto: SignupDto): Promise<void> {
		return this.authService.signUp(signupDto);
	}

	@Post('/signin')
	signIn(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
		return this.authService.signIn(signinDto);
	}

	@Post('/test')
	@UseGuards(AuthGuard())
	test(@GetUser() user: User) {
		console.log('UID', user.UID);
		console.log('Id', user.id);
		console.log('nickname', user.nickname);
		return user.nickname;
	}
}
