# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js

npm install --save-dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```

To compile

```
npx hardhat compile
```

In Case we are using multiple solidity verions, we define them in hardhat.config.js

To deploy on a specific network

```
npx hardhat deploy --network goerli
```

To start local testnet

```
npx hardhat node or yarn hardhat node
```

To run script

```
npx hardhat run scripts/fund.js --network localhost
npx hardhat run scripts/withdraw.js --network localhost
```
