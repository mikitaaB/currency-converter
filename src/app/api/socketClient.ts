type ExchangeRates = {
	[currency: string]: {
		symbol: string;
		price: number;
	};
};

export const createWebSocketConnection = (
	pair: string,
	setExchangeRates: React.Dispatch<React.SetStateAction<ExchangeRates>>
): WebSocket => {
	const socket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

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
		const data = JSON.parse(event.data);
		if (Array.isArray(data)) {
			const [, updateData] = data;
			if (updateData && updateData.length === 10) {
				const newExchangeRates = {
					...setExchangeRates,
					[pair]: {
						symbol: pair,
						price: updateData[6],
					},
				};
				setExchangeRates(newExchangeRates);
			}
		}
	};

	socket.onclose = () => {
		console.log("WebSocket connection closed");
	};

	return socket;
};
