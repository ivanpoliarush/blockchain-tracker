import clsx from 'clsx';
import { TransactionsLoading } from '../transactions-loading/transactions-loading';
import { TransactionItem } from '../transaction-item/transaction-item';
import { useTransactions } from '../../hooks/use-transactions';

export const TransactionList = () => {
	const { transactions, loading } = useTransactions();

	return (
		<div
			className={clsx('h-[100%] flex flex-col gap-4', {
				['items-center justify-center']: !transactions.length,
			})}
		>
			{transactions.length && !loading ? (
				transactions.map((transaction) => (
					<TransactionItem
						transaction={transaction}
						key={transaction.hash}
					/>
				))
			) : (
				<TransactionsLoading />
			)}
		</div>
	);
};
