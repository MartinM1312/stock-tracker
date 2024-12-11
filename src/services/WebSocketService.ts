import { ApiResponse } from "../types";

class WebSocketService {
	private socket: WebSocket;

	constructor(baseUrl: string, token: string) {
		this.socket = new WebSocket(
			`${baseUrl}?token=${token}`
		);
		this.socket.addEventListener("error", error => {
			console.error("WebSocket error:", error);
		});
		this.socket.addEventListener("close", event => {
			console.warn("WebSocket closed:", event.reason);
		});
	}

	subscribe(symbol: string): void {
		console.log(this.socket.readyState);
		if (this.socket.readyState === WebSocket.OPEN) {
			console.log(
				"WebSocket already open. Sending subscribe message..."
			);
			this.socket.send(
				JSON.stringify({ type: "subscribe", symbol })
			);
		} else {
			console.log("Connecting ...");
			this.socket.addEventListener("open", () => {
				console.log("WebSocket connected.");
				this.socket.send(
					JSON.stringify({ type: "subscribe", symbol })
				);
			});
		}
	}

	unsubscribe(symbol: string): void {
		console.log("Disconnecting ...");
		this.socket.send(
			JSON.stringify({ type: "unsubscribe", symbol })
		);
	}

	onMessage(callback: (data: ApiResponse) => void): void {
		this.socket.addEventListener("message", event => {
			try {
				const parsedData = JSON.parse(event.data);
				callback(parsedData);
			} catch (error) {
				console.error(
					"Error parsing WebSocket message:",
					error
				);
			}
		});
	}
}

export default WebSocketService;
