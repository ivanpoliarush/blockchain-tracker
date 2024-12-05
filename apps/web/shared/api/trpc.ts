import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../api/src/modules/trpc/router/trpc.router';

export const trpc = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: process.env.NEXT_PUBLIC_BACKEND_URL as string,
		}),
	],
});
