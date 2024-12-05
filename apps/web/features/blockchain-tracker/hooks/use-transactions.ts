import { create } from 'zustand';
import { TransactionsState } from '../types/transactions-state';
import { trpc } from '../../../shared/api/trpc';
import { Transaction } from '@shared-types';

export const useTransactions = create<TransactionsState>((set, get) => ({
	transactions: [],
	loading: true,

	fetchTransactions: async () => {
		try {
			const transactions = await trpc.getTransactions.query();
			if (!Array.isArray(transactions)) {
				return;
			}

			set({ transactions });
		} catch (error) {
			console.log('Failed to get transactions:', error);
		} finally {
			set({ loading: false });
		}
	},
	addTransaction: (transaction: Transaction) => {
		const { transactions } = get();

		set({
			transactions: [transaction, ...transactions],
		});
	},
}));
