import { Injectable } from '@nestjs/common';
import { TRPCService } from '../services/trpc.service';

@Injectable()
export class TRPCRouter {
	constructor(private readonly trpc: TRPCService) {}
}
