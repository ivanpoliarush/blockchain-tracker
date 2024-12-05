import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { BLOCKCHAIN_MODULE_OPTIONS_KEY } from '../constants/module';
import { BlockchainModuleConfig } from '../types/module';
import { Transaction } from '@shared-types';
import { ProducerService } from '@shared-api';
import { Queue } from '@shared-utils';

@Injectable()
export class BlockchainService implements OnModuleInit, OnModuleDestroy {
	private provider: ethers.WebSocketProvider;

	constructor(
		@Inject(BLOCKCHAIN_MODULE_OPTIONS_KEY)
		private readonly config: BlockchainModuleConfig,
		private readonly producerService: ProducerService,
	) {}

	async onModuleInit() {
		this.provider = new ethers.WebSocketProvider(
			this.config.blockchainConnectionUrl,
		);
		this.provider.on('block', this.handleNewBlock.bind(this));

		await this.emitAllTransactions();
	}

	onModuleDestroy() {
		this.provider.removeAllListeners();
		this.provider.destroy();
	}

	private async emitAllTransactions() {
		const queue = new Queue({ maxTasksCount: 5 });

		const blocksCount = await this.provider.getBlockNumber();
		const transactionTasks = Array.from({
			length: blocksCount,
		}).map((_, index) => {
			return async () => {
				await this.handleNewBlock(index + 1);
			};
		});

		await queue.run(transactionTasks);
	}

	private async handleNewBlock(blockNumber: number) {
		const block = await this.provider.getBlock(blockNumber);
		const promises = block.transactions.map(async (hash) => {
			const blockchainTransaction =
				await this.provider.getTransaction(hash);

			const transaction: Transaction = {
				hash,
				blockNumber,
				value: ethers.formatEther(blockchainTransaction.value),
				from: blockchainTransaction.from,
				to: blockchainTransaction.to,
			};

			await this.sendTransactions([transaction]);
		});

		await Promise.all(promises);
	}

	private async sendTransactions(transactions: Transaction[]) {
		this.producerService.produce({
			topic: 'transaction',
			messages: transactions.map((transaction) => ({
				value: JSON.stringify(transaction),
			})),
		});
	}
}
