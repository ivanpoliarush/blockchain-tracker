import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { KafkaModule } from '@shared-api';
import { getKafkaModuleConfig } from './config/kafka-module.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		KafkaModule.forRoot({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getKafkaModuleConfig,
		}),
		TransactionModule,
	],
})
export class AppModule {}
