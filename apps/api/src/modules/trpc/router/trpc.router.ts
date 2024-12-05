import { INestApplication, Injectable } from '@nestjs/common';
import { TRPCService } from '../services/trpc.service';
import { AddressService } from 'src/modules/address/services/address.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { TransactionService } from 'src/modules/transaction/services/transaction.service';

@Injectable()
export class TRPCRouter {
	constructor(
		private readonly trpc: TRPCService,
		private readonly addressService: AddressService,
		private readonly transactionService: TransactionService,
	) {}

	appRouter = this.trpc.router({
		getAddress: this.trpc.producer.query(async () => {
			const followingAddress =
				await this.addressService.getFollowingAddress();
			return { followingAddress: followingAddress?.address };
		}),
		updateAddress: this.trpc.producer
			.input(z.object({ address: z.string() }))
			.query(async ({ input }) => {
				await this.addressService.updateFollowingAddress(input.address);
			}),
		deleteAddress: this.trpc.producer.query(async () => {
			await this.addressService.deleteFollowingAddress();
		}),
		getTransactions: this.trpc.producer.query(async () => {
			const transactions =
				await this.transactionService.getFollowingTransactions();
			return transactions;
		}),
	});

	async applyMiddleware(app: INestApplication) {
		app.use(
			'/trpc',
			trpcExpress.createExpressMiddleware({ router: this.appRouter }),
		);
	}
}

export type AppRouter = TRPCRouter['appRouter'];
