import { ConfigService } from '@nestjs/config';
import { KafkaModuleConfig } from '@shared-api';

export const getKafkaModuleConfig = (
	configService: ConfigService,
): KafkaModuleConfig => {
	const kafkaConnectionUrl = configService.get('KAFKA_CONNECTION_URL');
	const groupId = configService.get('KAFKA_GROUP_ID');

	return {
		kafkaConnectionUrl,
		groupId,
	};
};
