import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './services/address.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
	imports: [PrismaModule, forwardRef(() => TransactionModule)],
	providers: [AddressRepository, AddressService],
	exports: [AddressService],
})
export class AddressModule {}
