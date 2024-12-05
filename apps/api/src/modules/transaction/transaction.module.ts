import { forwardRef, Module } from '@nestjs/common';
import { TransactionConsumer } from './services/transaction-consumer';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionRepository } from './repositories/transaction.repository';
import { AddressModule } from '../address/address.module';

@Module({
	imports: [PrismaModule, forwardRef(() => AddressModule)],
	providers: [TransactionConsumer, TransactionRepository],
	exports: [TransactionRepository],
})
export class TransactionModule {}
