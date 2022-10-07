import { PickType } from '@nestjs/mapped-types';
import { Board } from '../board.entity';

export class CreateBoardDto extends PickType(Board, ['title', 'description'] as const) {}
