import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';

@Injectable()
export class AddressService {
	constructor(private readonly addressRepository: AddressRepository) {}

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
			await this.addressRepository.updateOneById(addressInfo.id, address);
		} else {
			await this.addressRepository.create(address);
		}
	}

	async deleteFollowingAddress() {
		const addressInfo = await this.addressRepository.findOne({});
		if (!addressInfo) {
			return;
		}

		await this.addressRepository.deleteOneById(addressInfo.id);
	}
}
