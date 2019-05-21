const BTC = require("./btc");

const address1 = {
	private: "7cf01d537016d6b0731b799da3b2630e37aa0da771b287413b00c7a5ff1df6a6",
	public:
		"032904ad8657ef8d75fcf2505a3929e65779c88b03f010bf83100dbab1c6bd273e",
	address: "BxSDUtq7GvJ7XXwaXvQd8xiNexgvZXYUbn",
	wif: "BsWto4VTnffHRpxwC7AUQUfJufBzxb27ojJUgxXKvf8fB3cCv4H9"
};

const address2 = {
	private: "646c7e429a5af2736c804b18f050de61ebe1844920e631d1273925ca7d0b34bc",
	public:
		"03044cd1b843f6e0e85edaee3e31afe7dd55fef11f63d00ba329d5deb735c93edc",
	address: "BubwGwrbExHMqZo1gq5roFvJKfSei4gJiP",
	wif: "BrhExjfR8dZqoqTj3tFfgZ6qAGQRBqZ5ru8jUq3mFqS8JeqNp7fW"
};

async function createAddress() {
	const response = await BTC.createAddress();
	console.log(response);
}

async function getBalance() {
	const response = await BTC.getBalance(address1.address);
	console.log(response.data);
}

async function transferCoin() {
	await BTC.transferCoin(
		address1.address,
		address2.address,
		10000,
		address1.private
	);
}

// getBalance();
// createAddress();
transferCoin().catch(resp => console.log("ERR", resp.response.data));
