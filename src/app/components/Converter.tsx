"use client";

import { useEffect, useState } from "react";
import { createWebSocketConnection } from "../api/socketClient";
import { PairSelect } from "./PairSelect";
import { AmountInput } from "./AmountInput";

type ConverterProps = {
	currencyPairs: string[];
};

export const Converter = ({ currencyPairs }: ConverterProps) => {
	const [amount, setAmount] = useState<number>(1);
	const [pair, setPair] = useState<string>(currencyPairs?.[0] ?? "BTCUSD");
	const [exchangeRate, setExchangeRate] = useState<number>(0);
	const [result, setResult] = useState<number>(0);

	useEffect(() => {
		const socket = createWebSocketConnection(pair, setExchangeRate);

		return () => {
			socket.close();
		};
	}, [pair]);

	useEffect(() => {
		setResult(+(amount * exchangeRate).toFixed(2));
	}, [amount, exchangeRate]);

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<PairSelect
				currencyPairs={currencyPairs}
				selectedPair={pair}
				onChange={setPair}
			/>
			<AmountInput amount={amount} onChange={setAmount} />
			<div className="font-bold text-gray-700">Result: {result}</div>
		</div>
	);
};
