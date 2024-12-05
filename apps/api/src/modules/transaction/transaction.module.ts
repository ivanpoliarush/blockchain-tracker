import { Module } from '@nestjs/common';
import { TransactionConsumer } from './services/transaction-consumer';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [TransactionConsumer],
})
export class TransactionModule {}
