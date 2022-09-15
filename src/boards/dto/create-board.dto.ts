import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty({ message: '제목을 입력해주세요.' })
  title: string;

  @IsNotEmpty({ message: '게시글을 입력해주세요.' })
  description: string;

  createAt: Date;
}
