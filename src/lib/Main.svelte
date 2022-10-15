<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants"
  import { Contract } from "ethers"
  import getProviderOrSigner from './web3modal'

  import Button from "./Button.svelte"
  import Logo from './Logo.svelte'
  let numberOfWhitelisted, joinedWhitelist, chainID

  const getNumberOfWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner()

      const whitelistContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
      
      const _numberOfWhitelisted = await whitelistContract.numAddressesWhitelisted()
      
      numberOfWhitelisted =_numberOfWhitelisted
    } catch (err) {
      console.error(err)
    }
  }

  const checkIfAddressInWhitelist = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const whitelistContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const address = await signer.getAddress()

      const _joinedWhitelist = await whitelistContract.whitelistedAddresses(address)

      joinedWhitelist = _joinedWhitelist
    } catch (err) {
      console.error(err)
    }
  }

  const getChain = async () => {
    const signer = await getProviderOrSigner(true)
    const chainID = await signer.getChainId() 
    return chainID
  }

  onMount(async () => {
    chainID = await getChain()
		await getNumberOfWhitelisted()
    await checkIfAddressInWhitelist()
	})

</script>

{#if chainID === 80001}
<main>
  <section>
    <h1 class="title">Welcome to Crypto Devs!</h1>
    <div class="description">
      It's a NFT collection for developers in Crypto.
    </div>
    <div class="description">
      {numberOfWhitelisted} have already joined the Whitelist
    </div>
    <Button
      {joinedWhitelist}
      checkIfAddressInWhitelist={() => checkIfAddressInWhitelist}
      getNumberOfWhitelisted={() => getNumberOfWhitelisted}
    />
  </section>
  <section>
    <Logo />
  </section>
</main>
{:else}
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
<span>Please connect your wallet to Mumbai Network (Polygon Testnet)</span>
{/if}

<style>
main {
  min-height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Courier New", Courier, monospace;
}
.title {
  font-size: 2rem;
  margin: 2rem 0;
}

.description {
  line-height: 1;
  margin: 2rem 0;
  font-size: 1.2rem;
}
</style>