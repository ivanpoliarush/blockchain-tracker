import { DynamicModule, Module, Provider } from '@nestjs/common';
import { BlockchainService } from './services/blockchain.service';
import { BlockchainModuleOptions } from './types/module';
import { BLOCKCHAIN_MODULE_OPTIONS_KEY } from './constants/module';

@Module({})
export class BlockchainModule {
	static forFoot(options: BlockchainModuleOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);

		return {
			imports: options.imports,
			module: BlockchainModule,
			providers: [BlockchainService, asyncOptions],
		};
	}

	private static createAsyncOptionsProvider(
		options: BlockchainModuleOptions,
	): Provider {
		return {
			provide: BLOCKCHAIN_MODULE_OPTIONS_KEY,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || [],
		};
	}
}
