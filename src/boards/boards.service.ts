import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository
	) {}

	async getAllBoard(user: User): Promise<Board[]> {
		const query = this.boardRepository.createQueryBuilder('board');

		query.where('board.userId = :userId', { userId: user.id });

		const boards = await query.getMany();

		// return this.boardRepository.find();
		return boards;
	}

	async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto, user);
	}

	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOneBy({ id });

		if (!found) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}

		return found;
	}

	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.boardRepository.delete({ id, user });

		if (result.affected === 0) {
			throw new NotFoundException(`Can't find Board with id ${id}`);
		}
	}

	async updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
		const { title, description } = updateBoardDto;
		const board = await this.getBoardById(id);

		board.title = title;
		board.description = description;
		await this.boardRepository.save(board);

		return board;
	}
}
