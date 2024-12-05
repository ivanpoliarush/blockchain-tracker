export interface AddressState {
	address: string | null;
	error: boolean;
	loading: boolean;

	setAddress: (address: string | null) => Promise<void>;
	fetchAddress: () => void;
}
