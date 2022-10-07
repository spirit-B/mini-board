import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/user.entity';
import {
	CreateDateColumn,
	Entity,
	BaseEntity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
} from 'typeorm';

@Entity()
export class Board extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsNotEmpty({ message: '제목을 작성해주세요.' })
	title: string;

	@Column()
	@IsNotEmpty({ message: '게시글을 작성해주세요.' })
	description: string;

	@Column()
	nickname: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => User, user => user.boards, { eager: false })
	user: User;
}
