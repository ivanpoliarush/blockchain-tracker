import { create } from 'zustand';
import { AddressState } from '../types/address-state';
import { trpc } from '../../../shared/api/trpc';

export const useAddress = create<AddressState>((set) => ({
	address: null,
	error: false,
	loading: true,

	fetchAddress: async () => {
		try {
			const response = await trpc.getAddress.query();
			if (!response) {
				throw new Error();
			}

			if (typeof response.followingAddress === 'string') {
				set({ address: response.followingAddress });
			}
		} catch (error) {
			console.log('Failed to fetch address:', error);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
	setAddress: async (address: string | null) => {
		try {
			if (address) {
				await trpc.updateAddress.query({ address });
				set({ address });
			} else {
				await trpc.deleteAddress.query();
				set({ address: null });
			}
		} catch (error) {
			console.log('Failed to update address:', error);
		}
	},
}));
