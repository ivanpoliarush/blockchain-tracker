import { Module } from '@nestjs/common';
import { TransactionConsumer } from './services/transaction-consumer';

@Module({
	providers: [TransactionConsumer],
})
export class TransactionModule {}
