import { Module } from '@nestjs/common';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getBlockchainModuleConfig } from './config/blockchain-module.config';
import { KafkaModule } from '@shared-api';
import { getKafkaModuleConfig } from './config/kafka-module.config';

@Module({
	imports: [
		ConfigModule.forRoot({}),
		KafkaModule.forRoot({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getKafkaModuleConfig,
		}),
		BlockchainModule.forFoot({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getBlockchainModuleConfig,
		}),
	],
})
export class AppModule {}
