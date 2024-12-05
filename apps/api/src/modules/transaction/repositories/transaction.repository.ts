import { Injectable } from '@nestjs/common';
import { Transaction } from '@shared-types';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class TransactionRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createTransaction(transaction: Transaction) {
		return this.prisma.transaction.create({
			data: {
				blockNumber: transaction.blockNumber,
				from: transaction.from,
				to: transaction.to,
				value: transaction.value,
				hash: transaction.hash,
			},
		});
	}
}
