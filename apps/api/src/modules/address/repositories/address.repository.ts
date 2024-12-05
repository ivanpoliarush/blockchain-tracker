import { Injectable } from '@nestjs/common';
import { Address, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class AddressRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findOne(filter: Partial<Address>) {
		return this.prisma.address.findFirst({ where: filter });
	}

	async create(address: string) {
		return this.prisma.address.create({
			data: {
				address,
			},
		});
	}

	async updateOneById(id: number, address: string) {
		return this.prisma.address.update({ where: { id }, data: { address } });
	}

	async deleteOneById(id: number) {
		return this.prisma.address.delete({ where: { id } });
	}
}