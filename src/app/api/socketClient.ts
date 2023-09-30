import { wsApiLink } from "../constants";

export const createWebSocketConnection = (
	pair: string,
	updateExchangeRate: (value: number) => void
): WebSocket => {
	const socket = new WebSocket(wsApiLink);

	socket.onopen = () => {
		console.log("WebSocket connection opened");
		const symbol = `t${pair}`;
		const message = JSON.stringify({
			event: "subscribe",
			channel: "ticker",
			symbol: symbol,
		});
		socket.send(message);
	};

	socket.onmessage = (event: MessageEvent) => {
		try {
			const data = JSON.parse(event.data);
			if (Array.isArray(data)) {
				const [, updateData] = data;
				if (updateData && updateData.length === 10) {
					updateExchangeRate(updateData[6]);
				}
			}
		} catch (error) {
			console.error(`Error parsing WebSocket message: ${error}`);
		}
	};

	socket.onerror = (event: Event) => {
		console.error(`WebSocket error: ${event}`);
	};

	socket.onclose = (event: CloseEvent) => {
		console.log(`WebSocket connection closed with code: ${event.code}`);
		console.error(
			`WebSocket connection closed with reason: ${event.reason}`
		);

		if (!event.wasClean) {
			console.error(`WebSocket connection closed unexpectedly`);
			setTimeout(() => {
				createWebSocketConnection(pair, updateExchangeRate);
			}, 5000);
		}
	};

	return socket;
};
