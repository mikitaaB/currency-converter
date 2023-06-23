import { ChangeEvent, memo, useRef } from "react";

type AmountInputProps = {
	amount: number;
	onChange: (amount: number) => void;
};

export const AmountInput = memo(function AmountInput({
	amount,
	onChange,
}: AmountInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const amountValue = parseFloat(value);
		if (
			!isNaN(amountValue) &&
			amountValue >= 0 &&
			amountValue <= Number.MAX_SAFE_INTEGER
		) {
			onChange(amountValue);
		} else {
			inputRef.current!.value = amount.toString();
		}
	};

	return (
		<label className="block mb-2 font-bold text-gray-700">
			Amount:
			<input
				ref={inputRef}
				className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				type="number"
				defaultValue={amount}
				onChange={handleAmountChange}
			/>
		</label>
	);
});
