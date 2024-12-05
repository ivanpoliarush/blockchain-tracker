import { Module } from '@nestjs/common';
import { AppGateway } from './services/app-gateway';

@Module({
	providers: [AppGateway],
	exports: [AppGateway],
})
export class SocketModule {}
