import { ConfigService } from '@nestjs/config';
import { AddressModuleConfig } from 'src/modules/address/types/module';

export const getAddressModuleConfig = (
	configService: ConfigService,
): AddressModuleConfig => {
	const blockchainConnectionUrl = configService.get(
		'BLOCKCHAIN_CONNECTION_URL',
	);

	return {
		blockchainConnectionUrl,
	};
};
