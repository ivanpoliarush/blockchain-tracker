import { BlockchainTracker } from '../features/blockchain-tracker/ui/main/main';

const HomePage = () => {
	return (
		<main className="flex column items-center justify-center h-[100vh]">
			<BlockchainTracker />
		</main>
	);
};

export default HomePage;
