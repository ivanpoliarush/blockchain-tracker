import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { BLOCKCHAIN_MODULE_OPTIONS_KEY } from '../constants/module';
import { BlockchainModuleConfig } from '../types/module';
import { Transaction } from '@shared'

@Injectable()
export class BlockchainService implements OnModuleInit, OnModuleDestroy {
	private provider: ethers.WebSocketProvider;

	constructor(
		@Inject(BLOCKCHAIN_MODULE_OPTIONS_KEY)
		private readonly config: BlockchainModuleConfig,
	) {}

	async onModuleInit() {
		this.provider = new ethers.WebSocketProvider(
			this.config.blockchainConnectionUrl,
		);
		this.provider.on('block', this.handleNewBlock.bind(this));
	}

	onModuleDestroy() {
		this.provider.removeAllListeners();
		this.provider.destroy();
	}

	private async handleNewBlock(blockNumber: number) {
		const block = await this.provider.getBlock(blockNumber);
		const promises = block.transactions.map(async (hash) => {
			const blockchainTransaction = await this.provider.getTransaction(hash);
			const transaction: Transaction = {
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
		console.log('Sending transactions...', transactions.length)
	}
}
