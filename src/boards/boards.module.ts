import { Module } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [TypeOrmExModule.forCustomRepository([BoardRepository]), AuthModule],
	controllers: [BoardsController],
	providers: [BoardsService],
})
export class BoardsModule {}
