import { ConfigService } from '@nestjs/config';
import { BlockchainModuleConfig } from 'src/modules/blockchain/types/module';

export const getBlockchainModuleConfig = (
	configService: ConfigService,
): BlockchainModuleConfig => {
	const blockchainConnectionUrl = configService.get(
		'BLOCKCHAIN_CONNECTION_URL',
	);

	return {
		blockchainConnectionUrl,
	};
};