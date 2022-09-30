import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// 전역 범위 파이프
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // decorator가 없는 속성이 들어오면 해당 속성은 제외하고 받아들임
			forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체를 막는다.
			transform: true, // client에서 값을 받자마자 타입을 정의한대로 자동 형변환한다.
		})
	);
	await app.listen(3000);
}
bootstrap();
