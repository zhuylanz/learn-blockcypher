const axios = require("axios");

const BTC_API_URL = "https://api.blockcypher.com/v1/btc/test3";
const BTC_API_TOKEN = "296130378220499ab143192bc8211001";
const createBtcUrl = url => BTC_API_URL + url;

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
  axios.post(createBtcUrl("/addrs"), {
    params: { token: BTC_API_TOKEN }
  });

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
