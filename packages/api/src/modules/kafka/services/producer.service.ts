import {
	Inject,
	Injectable,
	OnModuleDestroy,
	OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KafkaModuleConfig } from '../types/module';
import { KAFKA_MODULE_OPTIONS_KEY } from '../constants/module';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
	private kafka: Kafka = new Kafka({
		brokers: [this.config.kafkaConnectionUrl],
	});
	private producer: Producer = this.kafka.producer();

	constructor(
		@Inject(KAFKA_MODULE_OPTIONS_KEY)
		private readonly config: KafkaModuleConfig,
	) {}

	async onModuleInit() {
		await this.producer.connect();
	}

	async produce(record: ProducerRecord) {
		await this.producer.send(record);
	}

	async onModuleDestroy() {
		this.producer.disconnect();
	}
}
