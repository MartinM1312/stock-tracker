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
				"WebSocket is already open. Sending subscribe message."
			);
			this.socket.send(
				JSON.stringify({ type: "subscribe", symbol })
			);
		} else {
			console.log("Connecting ...");
			this.socket.addEventListener("open", () => {
				console.log("WebSocket connection established.");
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

	onMessage(callback: (data: any) => void): void {
		this.socket.addEventListener("message", event => {
			// console.log(
			// 	"WebSocket message received:",
			// 	event.data
			// );
			try {
				const parsedData = JSON.parse(event.data);
				// console.log(
				// 	"Parsed WebSocket message:",
				// 	parsedData
				// );
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
