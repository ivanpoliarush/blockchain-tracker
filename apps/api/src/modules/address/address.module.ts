import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './services/address.service';
import { TransactionModule } from '../transaction/transaction.module';
import { AddressModuleOptions } from './types/module';
import { ADDRESS_MODULE_OPTIONS_KEY } from './constants/module';

@Module({})
export class AddressModule {
	static forRoot(options: AddressModuleOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);

		return {
			global: options.global,
			module: AddressModule,
			imports: [PrismaModule, TransactionModule, ...options.imports],
			providers: [AddressRepository, AddressService, asyncOptions],
			exports: [AddressService],
		};
	}

	private static createAsyncOptionsProvider(
		options: AddressModuleOptions,
	): Provider {
		return {
			provide: ADDRESS_MODULE_OPTIONS_KEY,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || [],
		};
	}
}
