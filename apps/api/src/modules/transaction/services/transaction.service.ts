import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AddressService } from 'src/modules/address/services/address.service';

@Injectable()
export class TransactionService {
	constructor(
		private readonly transactionRepository: TransactionRepository,
		private readonly addressService: AddressService,
	) {}

	async getFollowingTransactions() {
		const followingAddress =
			await this.addressService.getFollowingAddress();
		if (!followingAddress) {
			return [];
		}

		const transactions =
			await this.transactionRepository.findTransactionsByAddress(
				followingAddress.address,
			);

		return transactions;
	}
}
