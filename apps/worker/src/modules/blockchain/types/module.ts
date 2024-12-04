import { DynamicModule } from '@nestjs/common';

export interface BlockchainModuleConfig {
	blockchainConnectionUrl: string;
}

export interface BlockchainModuleOptions
	extends Pick<DynamicModule, 'imports'> {
	inject: any[];
	useFactory: (
		...args: any[]
	) => BlockchainModuleConfig | Promise<BlockchainModuleConfig>;
}
