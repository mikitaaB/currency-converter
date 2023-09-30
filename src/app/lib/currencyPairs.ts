import { apiPairListExchange } from "../constants";

export const getCurrencyPairs = async () => {
	try {
		const response = await fetch(apiPairListExchange);
		if (!response.ok) {
			throw new Error("Failed to fetch currency pairs");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to fetch currency pairs");
	}
};
