import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Board } from 'src/boards/board.entity';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	@IsString()
	@MinLength(6, { message: '아이디는 최소 6글자 이상이어야 합니다.' })
	@MaxLength(20, { message: '아이디는 최대 20글자까지만 가능합니다.' })
	@Matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/, {
		message: '아이디는 영어 대소문자 및 숫자의 조합만 가능합니다.',
	})
	UID: string;

	@Column({ unique: true })
	@IsString()
	@MinLength(4, { message: '닉네임은 최소 4글자 이상이어야 합니다.' })
	@MaxLength(10, { message: '닉네임은 최대 10글자까지만 가능합니다.' })
	@Matches(/^(?=.*[\da-zA-Z가-힣])[a-zA-Z\d가-힣]*$/, {
		message: '닉네임은 영어 대소문자 및 한글, 숫자의 조합만 가능합니다.',
	})
	nickname: string;

	@Column()
	@IsString()
	@MinLength(6, { message: '비밀번호는 최소 6글자 이상이어야 합니다.' })
	@MaxLength(18, { message: '비밀번호는 최대 18글자까지만 가능합니다.' })
	@Matches(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^])[a-zA-Z\d!@#$%^]*$/, {
		message: '비밀번호는 영문자와 숫자, 특수문자(!@#$%^)의 조합만 가능합니다.',
	})
	password: string;

	@OneToMany(type => Board, board => board.user, { eager: true })
	boards: Board[];
}
