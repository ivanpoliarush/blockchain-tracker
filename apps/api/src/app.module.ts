import { Module } from '@nestjs/common';
import { TransactionModule } from './modules/transaction/transaction.module';
import { KafkaModule } from '@shared-api';
import { getKafkaModuleConfig } from './config/kafka-module.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TRPCModule } from './modules/trpc/trpc.module';
import { AddressModule } from './modules/address/address.module';
import { getAddressModuleConfig } from './config/address-module.config';

@Module({
	imports: [
		TRPCModule,
		ConfigModule.forRoot(),
		KafkaModule.forRoot({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getKafkaModuleConfig,
		}),
		AddressModule.forRoot({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getAddressModuleConfig,
		}),
		TransactionModule,
	],
})
export class AppModule {}
