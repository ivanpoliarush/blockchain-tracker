import { Module } from '@nestjs/common';
import { TRPCService } from './services/trpc.service';
import { TRPCRouter } from './router/trpc.router';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
	imports: [TransactionModule],
	providers: [TRPCService, TRPCRouter],
})
export class TRPCModule {}
