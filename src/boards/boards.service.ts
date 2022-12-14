import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

		// query.where('board.userId = :userId', { userId: user.id });

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
			throw new NotFoundException(`해당 게시물이 존재하지 않습니다.`);
		}

		return found;
	}

	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.boardRepository.delete({ id, user });

		if (result.affected === 0) {
			throw new NotFoundException(`해당 게시물을 찾을 수 없습니다.`);
		}
	}

	async updateBoard(id: number, updateBoardDto: UpdateBoardDto, user: User): Promise<Board> {
		const { title, description } = updateBoardDto;
		const board = await this.getBoardById(id);

		board.title = title;
		board.description = description;

		if (board.nickname === user.nickname)
			await this.boardRepository.update({ id, user }, board);
		else throw new UnauthorizedException('수정할 수 있는 권한이 없습니다.');

		return board;
	}
}
