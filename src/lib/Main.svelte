<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import getProviderOrSigner from './web3modal'
  import { getNumberOfWhitelisted, checkIfAddressInWhitelist } from './functions'

  import Button from "./Button.svelte"
  import Logo from './Logo.svelte'

  import { numberOfWhitelisted, joinedWhitelist } from '../stores/store'

  let numberOfWhitelistedValue, joinedWhitelistValue, chainID

	numberOfWhitelisted.subscribe((value) => {
		numberOfWhitelistedValue = value;
	})

  joinedWhitelist.subscribe((value) => {
    joinedWhitelistValue = value
  })

  const getNWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner()
      const _numberOfWhitelisted = await getNumberOfWhitelisted(provider)
      numberOfWhitelisted.set(_numberOfWhitelisted)
      return _numberOfWhitelisted

    } catch (err) {
      console.error(err)
    }
  }

  const checkIfAddrInWL = async () => {
    try {
      const signer = await getProviderOrSigner(true)

      const _joinedWhitelist = await checkIfAddressInWhitelist(signer)

      joinedWhitelist.set(_joinedWhitelist)

      return _joinedWhitelist
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
		await getNWhitelisted()
    await checkIfAddrInWL()
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
      {numberOfWhitelistedValue} have already joined the Whitelist
    </div>
    <Button {joinedWhitelistValue} />
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