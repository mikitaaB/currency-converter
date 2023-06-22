export async function getCurrencyPairs() {
	try {
		const apiUrl =
			"https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange";
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error("Failed to fetch currency pairs");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error("Failed to fetch currency pairs");
	}
}
