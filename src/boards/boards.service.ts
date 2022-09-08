import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoard(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: createBoardDto) {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      nickname, // nickname과 time은 추후 로그인 및 게시글 작성 시 완료
      time,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(
        `해당 아이디를 가진 게시물이 존재하지 않습니다. id : ${id}`,
      );
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== found.id);
  }
}
