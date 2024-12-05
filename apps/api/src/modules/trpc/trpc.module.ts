import { Module } from '@nestjs/common';
import { TRPCService } from './services/trpc.service';
import { TRPCRouter } from './router/trpc.router';
import { AddressModule } from '../address/address.module';

@Module({
	imports: [AddressModule],
	providers: [TRPCService, TRPCRouter],
})
export class TRPCModule {}
