import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
	@IsString()
	@MinLength(4, { message: '아이디는 최소 4글자 이상이어야 합니다.' })
	@MaxLength(18, { message: '아이디는 최대 18글자까지만 가능합니다.' })
	@Matches(/^[a-zA-Z0-9]*$/, {
		message: '아이디는 영어 대소문자 및 숫자 조합만 가능합니다.',
	})
	username: string;

	@IsString()
	@MinLength(4, { message: '비밀번호는 최소 4글자 이상이어야 합니다.' })
	@MaxLength(20, { message: '비밀번호는 최대 20글자까지만 가능합니다.' })
	// 영어와 숫자만 가능한 유효성 체크
	@Matches(/^[a-zA-Z0-9]*$/, {
		message: '비밀번호는 영어와 숫자의 조합만 가능합니다.',
	})
	password: string;
}
