import { ChangeEvent, memo } from "react";

type PairSelectProps = {
	currencyPairs: string[];
	selectedPair: string;
	onChange: (pair: string) => void;
};

export const PairSelect = memo(function PairSelect({
	currencyPairs,
	selectedPair,
	onChange,
}: PairSelectProps) {
	const handlePairChange = (event: ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value);
	};

	return (
		<label className="block mb-2 font-bold text-gray-700">
			Select pair to convert:
			<select
				className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				value={selectedPair}
				onChange={handlePairChange}
			>
				{currencyPairs &&
					currencyPairs.map((pair) => (
						<option key={pair} value={pair}>
							{pair}
						</option>
					))}
			</select>
		</label>
	);
});
