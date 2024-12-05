import { DynamicModule } from '@nestjs/common';

export interface KafkaModuleConfig {
	kafkaConnectionUrl: string;
	groupId: string;
}

export interface KafkaModuleOptions extends Pick<DynamicModule, 'imports'> {
	inject?: any[];
	global?: boolean;
	useFactory: (
		...args: any[]
	) => KafkaModuleConfig | Promise<KafkaModuleConfig>;
}
