import { PickType } from '@nestjs/mapped-types';
import { User } from '../user.entity';

// User entity 에서 해당 Culumn만 선택
export class SigninDto extends PickType(User, ['UID', 'password'] as const) {}
