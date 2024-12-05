'use client';

import { useEffect, useState } from 'react';
import { useAddress } from '../../hooks/use-address';

export const SearchInput = () => {
	const [value, setValue] = useState<string>('');
	const { address, setAddress } = useAddress();

	useEffect(() => {
		setValue(address || '');
	}, [address]);

	const handleUpdateAddress = async () => {
		if (!value.trim().length) {
			await setAddress(null);
		} else {
			await setAddress(value.trim());
		}
	};

	const handleDeleteAddress = async () => {
		await setAddress(null);
		setValue('');
	};

	return (
		<div className="flex items-center gap-3">
			<input
				value={value}
				placeholder="Enter ETH address"
				onChange={(event) => setValue(event.target.value)}
				className="bg-white rounded-lg w-80 h-10 outline-none px-3"
			/>
			{!address && (
				<button
					className="h-10 bg-[#2F00FF] rounded-lg px-6 transition-all text-white hover:bg-[#300AD9]"
					onClick={handleUpdateAddress}
				>
					Search
				</button>
			)}
			{address && value === address && (
				<button
					className="h-10 bg-[#D42323] rounded-lg px-6 transition-all text-white hover:bg-[#BA2121]"
					onClick={handleDeleteAddress}
				>
					Stop
				</button>
			)}
			{address && value !== address && (
				<button
					className="h-10 bg-[#2F00FF] rounded-lg px-6 transition-all text-white hover:bg-[#300AD9]"
					onClick={handleUpdateAddress}
				>
					Update
				</button>
			)}
		</div>
	);
};
