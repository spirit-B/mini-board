import { IsNotEmpty } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  title: string;

  @IsNotEmpty({ message: '게시글을 작성해주세요.' })
  description: string;
}
