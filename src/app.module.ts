import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/board.entity';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '1234',
			database: 'boards',
			entities: [Board, User],
			synchronize: true,
		}),
		BoardsModule,
		AuthModule,
	],
})
export class AppModule {}
