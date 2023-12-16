import Converter from "./components/Converter";
import { getCurrencyPairs } from "./lib/currencyPairs";

export default async function Home() {
	const pairs = await getCurrencyPairs();

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-xl mb-4">Cryptocurrency converter</h1>
			<Converter currencyPairs={pairs[0]} />
		</div>
	);
}
