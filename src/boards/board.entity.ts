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
	title: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => User, user => user.boards, { eager: false })
	user: User;
}
