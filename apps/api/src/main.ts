import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TRPCRouter } from './modules/trpc/router/trpc.router';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const trpc = app.get(TRPCRouter);
	trpc.applyMiddleware(app);
	await app.listen(3001);
}
bootstrap();
