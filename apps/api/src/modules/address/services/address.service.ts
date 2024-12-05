import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { TransactionRepository } from 'src/modules/transaction/repositories/transaction.repository';

@Injectable()
export class AddressService {
	constructor(
		private readonly addressRepository: AddressRepository,
		private readonly transactionRepository: TransactionRepository,
	) {}

	async getFollowingAddress() {
		const addressInfo = await this.addressRepository.findOne({});
		if (!addressInfo) {
			return null;
		}

		return addressInfo.address;
	}

	async updateFollowingAddress(address: string) {
		const addressInfo = await this.addressRepository.findOne({});

		if (addressInfo) {
			await Promise.all([
				this.addressRepository.updateOneById(addressInfo.id, address),
				this.transactionRepository.deleteTransactionsByAddress(
					addressInfo.address,
				),
			]);
		} else {
			await this.addressRepository.create(address);
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
