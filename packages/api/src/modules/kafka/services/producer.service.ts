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
	private kafka: Kafka;
	private producer: Producer;

	constructor(
		@Inject(KAFKA_MODULE_OPTIONS_KEY)
		private readonly config: KafkaModuleConfig,
	) {}

	async onModuleInit() {
		this.kafka = new Kafka({ brokers: [this.config.kafkaConnectionUrl] });
		this.producer = this.kafka.producer();

		await this.producer.connect();
	}

	async produce(record: ProducerRecord) {
		await this.producer.send(record);
	}

	async onModuleDestroy() {
		this.producer.disconnect();
	}
}
