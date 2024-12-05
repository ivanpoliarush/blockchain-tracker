import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useTransactions } from './use-transactions';
import { Transaction } from '@shared-types';

export const useAddTransaction = () => {
	const { addTransaction } = useTransactions();
	const socket = io(process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL);

	useEffect(() => {
		socket.connect();

		socket.on('transaction', (transaction: Transaction) => {
			addTransaction(transaction);
		});

		return () => {
			socket.disconnect();
		};
	}, []);
};
