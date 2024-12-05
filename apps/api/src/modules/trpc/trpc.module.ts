import { Module } from '@nestjs/common';
import { TRPCService } from './services/trpc.service';
import { TRPCRouter } from './router/trpc.router';

@Module({
	providers: [TRPCService, TRPCRouter],
})
export class TRPCModule {}
