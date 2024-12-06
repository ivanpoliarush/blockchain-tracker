import { Injectable } from '@nestjs/common';
import { Transaction } from '@shared-types';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class TransactionRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createTransaction(
		transaction: Transaction & { followingAddress: string },
	) {
		return this.prisma.transaction.create({
			data: {
				blockNumber: transaction.blockNumber,
				from: transaction.from,
				to: transaction.to,
				value: transaction.value,
				hash: transaction.hash,
				address: transaction.followingAddress,
			},
		});
	}

	async findTransactionsByAddress(address: string) {
		return this.prisma.transaction.findMany({
			where: { address },
			orderBy: {
				createAt: 'desc',
			},
		});
	}

	async findTransactionsByHash(hash: string) {
		return this.prisma.transaction.findMany({ where: { hash } });
	}

	async deleteTransactionsByAddress(address: string) {
		return this.prisma.transaction.deleteMany({ where: { address } });
	}
}
