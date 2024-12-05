'use client';

import { useEffect } from 'react';
import { Loader } from '../../../../shared/ui/loader/loader';
import { useAddress } from '../../hooks/use-address';
import { ErrorMessage } from '../error-message/error-message';
import { SearchInput } from '../search-input/search-input';
import { TransactionList } from '../transactions-list/transactions-list';
import clsx from 'clsx';
import { useTransactions } from '../../hooks/use-transactions';

export const BlockchainTracker = () => {
	const { loading, error, address, fetchAddress } = useAddress();
	const { fetchTransactions } = useTransactions();

	useEffect(() => {
		fetchAddress();
	}, []);

	useEffect(() => {
		if (address) {
			fetchTransactions();
		}
	}, [address]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<ErrorMessage message="Failed to get address. Press Ctrl(Cmd) + R to reload page" />
		);
	}

	return (
		<div className="flex flex-col gap-[40px] items-center">
			<SearchInput />
			<div
				className={clsx('transition-all duration-1000', {
					['h-[70vh] overflow-scroll pb-14']: !!address,
					['h-[0vh] overflow-hidden']: !address,
				})}
			>
				<TransactionList />
			</div>
		</div>
	);
};
