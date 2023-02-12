const { run } = require('hardhat')

const verify = async (contractAddress, args) => {
  console.log('Verifying, please wait...')
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
    console.log('Verified!')
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.log('Verification Error:', e)
    }
  }
}

module.exports = { verify }
