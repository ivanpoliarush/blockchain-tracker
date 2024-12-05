'use client';

import clsx from 'clsx';
import { TransactionItemProps } from './transaction-item.props';
import { useAddress } from '../../hooks/use-address';

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
	const { address } = useAddress();

	return (
		<div className="w-full bg-white p-4 rounded-lg">
			<p>
				From:{' '}
				<span
					className={clsx({
						['text-[#FF1515]']: transaction.from === address,
					})}
				>
					{transaction.from}
				</span>
			</p>
			<p>
				To:{' '}
				<span
					className={clsx({
						['text-[#38CA10]']: transaction.to === address,
					})}
				>
					{transaction.to}
				</span>
			</p>
			<p>Value: {transaction.value} ETH</p>
			<p>Hash: {transaction.hash}</p>
		</div>
	);
};
