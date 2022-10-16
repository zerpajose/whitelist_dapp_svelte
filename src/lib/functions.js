import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants'
import { Contract } from 'ethers'

import { numberOfWhitelisted, loading, joinedWhitelist } from '../stores/store'
let numberOfWhitelistedValue, loadingValue, joinedWhitelistValue

numberOfWhitelisted.subscribe((value) => {
  numberOfWhitelistedValue = value
})

joinedWhitelist.subscribe((value) => {
  joinedWhitelistValue = value
})

loading.subscribe((value) => {
  loadingValue = value
})

const getNumberOfWhitelisted = async (provider) => {
  try {
    const whitelistContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
    const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted()
    return _numberOfWhitelisted
  } catch (err) {
    console.error(err)
  }
}

const checkIfAddressInWhitelist = async (signer) => {
  try {
    const whitelistContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    const address = await signer.getAddress()

    const _joinedWhitelist = await whitelistContract.whitelistedAddresses(address)

    return _joinedWhitelist

  } catch (err) {
    console.error(err)
  }
}

const getWhitelisted = async (signer) => {
  try {
    const whitelistContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    const tx = await whitelistContract.addAddressToWhitelist()
    loading.set(true)

    await tx.wait()
    loading.set(false)

    numberOfWhitelistedValue = await getNumberOfWhitelisted(signer)
    numberOfWhitelisted.set(numberOfWhitelistedValue)

    joinedWhitelist.set(true)

    const hash = await tx.hash
    return hash

  } catch (err) {
    console.error(err)
  }
}

export { getNumberOfWhitelisted, checkIfAddressInWhitelist, getWhitelisted }