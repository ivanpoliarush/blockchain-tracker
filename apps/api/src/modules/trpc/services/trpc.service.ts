import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';

@Injectable()
export class TRPCService {
	trpc = initTRPC.create();
	producer = this.trpc.procedure;
	router = this.trpc.router;
	mergeRoutes = this.trpc.mergeRouters;
}
