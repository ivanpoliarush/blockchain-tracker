import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class AppGateway {
	@WebSocketServer()
	private server: Server;

	sendMessage<T>(event: string, data: T) {
		this.server.emit(event, data);
	}
}
