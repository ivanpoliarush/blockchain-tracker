export const SearchInput = () => {
	return (
		<div className="flex items-center gap-3">
			<input
				placeholder="Enter ETH address"
				className="bg-white rounded-lg w-80 h-10 outline-none px-3"
			/>
			<button className="h-10 bg-[#2F00FF] rounded-lg px-6 transition-all text-white hover:bg-[#300AD9]">
				Search
			</button>
		</div>
	);
};
