import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from '../typeorm-ex.decorator';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({ title, description });

    await board.save();
    return board;
  }
}
