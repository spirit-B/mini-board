import {
	Body,
	Controller,
	Get,
	Delete,
	Param,
	Patch,
	Post,
	ParseIntPipe,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService) {}

	@Get('/')
	getAllBoard(@GetUser() user: User): Promise<Board[]> {
		return this.boardsService.getAllBoard(user);
	}

	@Post('/')
	@UseGuards(AuthGuard())
	createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User): Promise<Board> {
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	@Delete('/:id')
	@UseGuards(AuthGuard())
	deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
		return this.boardsService.deleteBoard(id, user);
	}

	@Patch('/:id')
	@UseGuards(AuthGuard())
	updateBoard(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateBoardDto: UpdateBoardDto,
		@GetUser() user: User
	) {
		return this.boardsService.updateBoard(id, updateBoardDto, user);
	}
}
