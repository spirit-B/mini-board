import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/signup')
	signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post('/signin')
	signIn(@Body() authCredntialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		return this.authService.signIn(authCredntialsDto);
	}

	@Post('/test')
	@UseGuards(AuthGuard())
	test(@GetUser() user: User) {
		console.log('user', user);
	}
}
