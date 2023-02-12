const networkConfig = {
  // chain ID of goerili is 5
  5: {
    name: 'goerli',
    ethUsdPriceFeed: '0xd4a33860578de61dbabdc8bfdb98fd742fa7028e', // https://docs.chain.link/data-feeds/price-feeds/addresses/
  },
}

const developmentChains = ['hardhat', 'localhost']
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000 //Since we have 8 decimals, we add 8 zeros after 2000

module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER }
