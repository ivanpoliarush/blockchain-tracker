import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from '@shared-api';
import { Transaction } from '@shared-types';

@Injectable()
export class TransactionConsumer implements OnModuleInit {
	constructor(private readonly consumerService: ConsumerService) {}

	async onModuleInit() {
		await this.consumerService.consume(
			{ topics: ['transaction'] },
			{
				eachMessage: async ({ message }) => {
					const transaction: Transaction = JSON.parse(
						message.value.toString(),
					);

					console.log(transaction);
				},
			},
		);
	}
}
