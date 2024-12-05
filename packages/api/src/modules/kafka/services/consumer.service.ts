import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import {
	Consumer,
	ConsumerRunConfig,
	ConsumerSubscribeTopics,
	Kafka,
} from 'kafkajs';
import { KAFKA_MODULE_OPTIONS_KEY } from '../constants/module';
import { KafkaModuleConfig } from '../types/module';

@Injectable()
export class ConsumerService implements OnModuleInit, OnModuleDestroy {
	private kafka: Kafka;
	private consumers: Consumer[];

	constructor(
		@Inject(KAFKA_MODULE_OPTIONS_KEY)
		private readonly config: KafkaModuleConfig,
	) {}

	onModuleInit() {
		this.kafka = new Kafka({
			brokers: [this.config.kafkaConnectionUrl],
		});
		this.consumers = [];
	}

	async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
		const consumer = this.kafka.consumer({
			groupId: this.config.groupId,
		});
		await consumer.connect();
		await consumer.subscribe(topic);
		await consumer.run(config);
		this.consumers.push(consumer);
	}

	async onModuleDestroy() {
		for (const consumer of this.consumers) {
			await consumer.disconnect();
		}
	}
}
