import { apiLink } from "../constants";

export const createWebSocketConnection = (
	pair: string,
	setExchangeRates: React.Dispatch<React.SetStateAction<number>>
): WebSocket => {
	const socket = new WebSocket(apiLink);

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
					setExchangeRates(updateData[6]);
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
	};

	return socket;
};
