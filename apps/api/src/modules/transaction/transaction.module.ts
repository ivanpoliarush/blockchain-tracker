import { forwardRef, Module } from '@nestjs/common';
import { TransactionConsumer } from './services/transaction-consumer';
import { PrismaModule } from '../prisma/prisma.module';
import { TransactionRepository } from './repositories/transaction.repository';
import { AddressModule } from '../address/address.module';
import { TransactionService } from './services/transaction.service';
import { SocketModule } from '../socket/socket.module';

@Module({
	imports: [PrismaModule, SocketModule, forwardRef(() => AddressModule)],
	providers: [TransactionConsumer, TransactionRepository, TransactionService],
	exports: [TransactionRepository, TransactionService],
})
export class TransactionModule {}
