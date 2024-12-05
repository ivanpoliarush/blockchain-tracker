import { Module } from '@nestjs/common';
import { TRPCService } from './services/trpc.service';
import { TRPCRouter } from './router/trpc.router';
import { AddressModule } from '../address/address.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
	imports: [AddressModule, TransactionModule],
	providers: [TRPCService, TRPCRouter],
})
export class TRPCModule {}
