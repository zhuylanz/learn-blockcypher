const BTC = require("./btc");

const address1 = {
	private: "571ed1de0c368eb7ae3e77c9601d5f7dda48189a67e0d3587af61fb2e8be232a",
	public:
		"02f237a3725dd40fd01f16c1cb1cceb8bced1d38a99c1dbd90cf0279a9ff921615",
	address: "mm9nYMBLzXEjA1xn8YW6Jzi96qugBzJY7K",
	wif: "cQW3zAp14VoXFb88jbZyWxUhenPUZZrYDp7hgwP4v5QsrF84umhb"
};

async function createAddress() {
	const response = await BTC.createAddress();
	console.log(response.data);
}

async function getBalance() {
	const response = await BTC.getBalance(address1.address);
	console.log(response.data);
}

getBalance();
