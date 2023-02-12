// function deployFunc() {
//   console.log('Hi,,,,,,,,,')
// }

const { network } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')
require('dotenv').config()
// module.exports.default = deployFunc

module.exports = async ({
  getNamedAccounts,
  deployments: { deploy, log, get },
}) => {
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  // const ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  let ethUsdPriceFeedAddress
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await get('MockV3Aggregator')
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
  }
  const args = [ethUsdPriceFeedAddress]
  log('----------------------------------------------------')
  log('Deploying FundMe and waiting for confirmations...')
  log('deployer', deployer)
  const fundMe = await deploy('FundMe', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  log(`FundMe deployed at ${fundMe.address}`)

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    // verify
    await verify(fundMe.address, args)
  }
  log('---------------------------')
}
module.exports.tags = ['all', 'fundme']
