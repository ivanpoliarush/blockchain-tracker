import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '@shared-api';
import { Transaction } from '@shared-types';
import { EachMessagePayload } from 'kafkajs';
import { AddressService } from 'src/modules/address/services/address.service';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionConsumer implements OnModuleInit {
	private readonly logger: Logger = new Logger(TransactionConsumer.name);

	constructor(
		private readonly consumerService: ConsumerService,
		private readonly addressService: AddressService,
		private readonly transactionRepository: TransactionRepository,
	) {}

	async onModuleInit() {
		await this.consumerService.consume(
			{ topics: ['transaction'] },
			{
				eachMessage: this.handleNewTransaction.bind(this),
			},
		);
	}

	async handleNewTransaction({ message }: EachMessagePayload) {
		try {
			const transaction: Transaction = JSON.parse(
				message.value.toString(),
			);

			const followingAddress =
				await this.addressService.getFollowingAddress();
			if (!followingAddress) {
				return;
			}

			if (
				transaction.to !== followingAddress &&
				transaction.from !== followingAddress
			) {
				return;
			}

			const existsTransactions =
				await this.transactionRepository.findTransactionsByHash(
					transaction.hash,
				);
			if (existsTransactions.length) {
				return;
			}

			await this.transactionRepository.createTransaction({
				...transaction,
				followingAddress,
			});
		} catch (error) {
			this.logger.error('Failed to handle new transaction:', error);
		}
	}
}
