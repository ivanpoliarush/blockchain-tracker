import { SearchInput } from '../search-input/search-input';
import { TransactionList } from '../transactions-list/transactions-list';

export const BlockchainTracker = () => {
	return (
		<div className="flex flex-col gap-[40px] items-center">
			<SearchInput />
			<div className="h-[70vh] pb-14 overflow-scroll">
				<TransactionList transactions={[]} />
			</div>
		</div>
	);
};
