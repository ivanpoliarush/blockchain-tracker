import { Module } from '@nestjs/common';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getBlockchainModuleConfig } from './config/blockchain-module.config';

@Module({
	imports: [
		ConfigModule.forRoot({}),
		BlockchainModule.forFoot({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getBlockchainModuleConfig,
		}),
	],
})
export class AppModule {}
