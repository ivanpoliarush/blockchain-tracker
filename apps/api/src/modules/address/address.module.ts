import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './services/address.service';

@Module({
	imports: [PrismaModule],
	providers: [AddressRepository, AddressService],
})
export class AddressModule {}
