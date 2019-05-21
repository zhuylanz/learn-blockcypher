const axios = require("axios");

const BTC_API_URL = "https://api.blockcypher.com/v1/bcy/test";
const BTC_API_TOKEN = "296130378220499ab143192bc8211001";
const createBtcUrl = url => BTC_API_URL + url + "?token=" + BTC_API_TOKEN;

module.exports.createWallet = data =>
  axios.post(createBtcUrl("/wallets"), {
    params: { token: BTC_API_TOKEN },
    data: data
  });

module.exports.createHDWallet = data =>
  axios.post(createBtcUrl("/wallets/hd"), {
    params: { token: BTC_API_TOKEN },
    data: data
  });

module.exports.getWallet = name =>
  axios.get(createBtcUrl(`/wallets/${name}`), {
    params: { token: BTC_API_TOKEN }
  });

module.exports.getHDWallet = name =>
  axios.get(createBtcUrl(`/wallets/hd/${name}`), {
    params: { token: BTC_API_TOKEN }
  });

module.exports.addAddressToWallet = (name, addresses) =>
  axios.post(createBtcUrl(`/wallets/${name}`), {
    params: { token: BTC_API_TOKEN },
    data: {
      addresses: addresses
    }
  });

module.exports.createAddress = () =>
  axios.post(createBtcUrl("/addrs")).then(resp => resp.data);

module.exports.getAddress = address =>
  axios.get(createBtcUrl(createBtcUrl(`/addrs/${address}`)), {
    params: { token: BTC_API_TOKEN }
  });

module.exports.getFullAddress = address =>
  axios.get(createBtcUrl(createBtcUrl(`/addrs/${address}/full`)), {
    params: { token: BTC_API_TOKEN }
  });

module.exports.getBalance = address =>
  axios.get(createBtcUrl(`/addrs/${address}/balance`), {
    params: { token: BTC_API_TOKEN }
  });

const convertToSatoshi = (amount, fromUnit) => {
  return amount;
};

const genTxObj = (inputAddress, outputAddress, satoshiAmount) =>
  axios
    .post(createBtcUrl("/txs/new"), {
      inputs: [{ addresses: [inputAddress] }],
      outputs: [{ addresses: [outputAddress], value: satoshiAmount }]
    })
    .then(resp => resp.data);

const signTx = txObj => someSigningFunc(txObj, privKey);

const broadcastTx = signedTxObj =>
  axios.post(createBtcUrl("/txs/send"), signedTxObj).then(resp => resp.data);

module.exports.transferCoin = async (
  inputAddress,
  outputAddress,
  btcAmount,
  inputAddressPrivKey
) => {
  const satoshiAmount = convertToSatoshi(btcAmount);
  const txObj = await genTxObj(inputAddress, outputAddress, satoshiAmount);
  console.log("> txObj", txObj);

  const signedTxObj = signTx(txObj);
  console.log("> signedTxObj", signedTxObj);

  return broadcastTx(signedTxObj);
};
