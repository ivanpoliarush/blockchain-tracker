import clsx from 'clsx';
import { TransactionsLoading } from '../transactions-loading/transactions-loading';
import { TransactionListProps } from './transactions-list.props';
import { TransactionItem } from '../transaction-item/transaction-item';

export const TransactionList = ({ transactions }: TransactionListProps) => {
	return (
		<div
			className={clsx('h-[100%] flex flex-col gap-4', {
				['items-center justify-center']: !transactions.length,
			})}
		>
			{transactions.length ? (
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
