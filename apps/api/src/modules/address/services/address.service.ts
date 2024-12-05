import { Inject, Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';
import { ethers } from 'ethers';
import { ADDRESS_MODULE_OPTIONS_KEY } from '../constants/module';
import { AddressModuleConfig } from '../types/module';

@Injectable()
export class AddressService {
	private provider: ethers.WebSocketProvider;

	constructor(
		private readonly addressRepository: AddressRepository,
		private readonly transactionRepository: TransactionRepository,
		@Inject(ADDRESS_MODULE_OPTIONS_KEY)
		private readonly config: AddressModuleConfig,
	) {}

	async onModuleInit() {
		this.provider = new ethers.WebSocketProvider(
			this.config.blockchainConnectionUrl,
		);
	}

	async getFollowingAddress() {
		const addressInfo = await this.addressRepository.findOne({});
		if (!addressInfo) {
			return null;
		}

		return addressInfo;
	}

	async updateFollowingAddress(address: string) {
		const addressInfo = await this.addressRepository.findOne({});
		const blockNumber = await this.provider.getBlockNumber();

		if (addressInfo) {
			await Promise.all([
				this.addressRepository.updateOneById(
					addressInfo.id,
					address,
					blockNumber,
				),
				this.transactionRepository.deleteTransactionsByAddress(
					addressInfo.address,
				),
			]);
		} else {
			await this.addressRepository.create(address, blockNumber);
		}
	}

	async deleteFollowingAddress() {
		const addressInfo = await this.addressRepository.findOne({});
		if (!addressInfo) {
			return;
		}

		await Promise.all([
			this.addressRepository.deleteOneById(addressInfo.id),
			this.transactionRepository.deleteTransactionsByAddress(
				addressInfo.address,
			),
		]);
	}
}
