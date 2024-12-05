import { Transaction } from '@shared-types';

export interface TransactionsState {
	transactions: Transaction[];
	loading: boolean;

	fetchTransactions: () => Promise<void>;
}
