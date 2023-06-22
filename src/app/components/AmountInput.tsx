import { ChangeEvent, memo } from "react";

type AmountInputProps = {
	amount: number;
	onChange: (amount: number) => void;
};

export const AmountInput = memo(function AmountInput({
	amount,
	onChange,
}: AmountInputProps) {
	const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
		let amountValue = parseFloat(event.target.value);
		if (!isNaN(amountValue) && amountValue >= 0) {
			onChange(amountValue);
		}
	};

	return (
		<label className="block mb-2 font-bold text-gray-700">
			Amount:
			<input
				className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				type="number"
				value={amount}
				onChange={handleAmountChange}
			/>
		</label>
	);
});
