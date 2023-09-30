"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createWebSocketConnection } from "../../api/socketClient";
import PairSelect from "../PairSelect/PairSelect";
import AmountInput from "../AmountInput";

type ConverterProps = {
	currencyPairs: string[];
};

const Converter = ({ currencyPairs }: ConverterProps) => {
	const [amount, setAmount] = useState<number>(1);
	const [pair, setPair] = useState<string>(currencyPairs?.[0] ?? "BTCUSD");
	const [exchangeRate, setExchangeRate] = useState<number>(0);

	const result = useMemo(
		() => +(amount * exchangeRate).toFixed(2),
		[amount, exchangeRate]
	);

	const updateExchangeRate = useCallback(
		(value: number) => {
			setExchangeRate(value);
		},
		[setExchangeRate]
	);

	const updateAmount = useCallback(
		(amountValue: number) => {
			setAmount(amountValue);
		},
		[setAmount]
	);

	const updatePair = useCallback(
		(pairValue: string) => {
			setPair(pairValue);
		},
		[setPair]
	);

	useEffect(() => {
		const socket = createWebSocketConnection(pair, updateExchangeRate);

		return () => {
			socket.close();
		};
	}, [pair, updateExchangeRate]);

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<PairSelect
				currencyPairs={currencyPairs}
				selectedPair={pair}
				onChange={updatePair}
			/>
			<AmountInput amount={amount} onChange={updateAmount} />
			<div className="font-bold text-gray-700">Result: {result}</div>
		</div>
	);
};

export default Converter;
