import { OmitType } from '@nestjs/mapped-types';
import { User } from '../user.entity';

// User entity에서 해당 Column만 제외하고 선택
export class SignupDto extends OmitType(User, ['id'] as const) {}
