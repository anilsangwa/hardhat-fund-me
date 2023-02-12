require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()
// require('./tasks/block-number')
require('hardhat-gas-reporter')
require('solidity-coverage')
require('hardhat-deploy')

const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ''

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ''

const LOCALHOST_KEY = process.env.LOCALHOST_KEY || ''
const LOCALHOST_RPC_URL = process.env.LOCALHOST_RPC_URL || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
    localhost: {
      url: LOCALHOST_RPC_URL,
      // accounts: [LOCALHOST_KEY],
      chainId: 31337,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: 'ETH',
  },
  // solidity: '0.8.17',
  // In Case we  are using multiple solidity verions, we define them here,
  solidity: {
    compilers: [{ version: '0.8.17' }, { version: '0.8.0' }],
  },
}
