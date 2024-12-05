import { DynamicModule, Module, Provider } from '@nestjs/common';
import { KafkaModuleOptions } from './types/module';
import { KAFKA_MODULE_OPTIONS_KEY } from './constants/module';
import { ConsumerService } from './services/consumer.service';
import { ProducerService } from './services/producer.service';

@Module({})
export class KafkaModule {
	static forRoot(options: KafkaModuleOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);

		return {
			module: KafkaModule,
			global: options.global,
			imports: options.imports,
			providers: [ConsumerService, ProducerService, asyncOptions],
			exports: [ConsumerService, ProducerService],
		};
	}

	private static createAsyncOptionsProvider(
		options: KafkaModuleOptions,
	): Provider {
		return {
			provide: KAFKA_MODULE_OPTIONS_KEY,
			useFactory: async (...args: any[]) => {
				const config = await options.useFactory(...args);
				return config;
			},
			inject: options.inject || [],
		};
	}
}
