export const TransactionsLoading = () => {
	return (
		<p className="text-3xl text-white font-medium">
			Looking for transactions
			<span className="animate-loadingDotAnimation">.</span>
			<span className="animate-loadingDotAnimation animation-delay-500">
				.
			</span>
			<span className="animate-loadingDotAnimation animation-delay-1000">
				.
			</span>
		</p>
	);
};
