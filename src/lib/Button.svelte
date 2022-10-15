<script>
  import { onMount } from 'svelte'
  import getProviderOrSigner from './web3modal'
  import { checkIfAddressInWhitelist, getWhitelisted } from './functions'

  import { numberOfWhitelisted, joinedWhitelist, loading } from '../stores/store'

  let numberOfWhitelistedValue, joinedWhitelistValue, loadingValue

	numberOfWhitelisted.subscribe((value) => {
		numberOfWhitelistedValue = value
	})

  joinedWhitelist.subscribe((value) => {
    joinedWhitelistValue = value
  })

  loading.subscribe((value) => {
    loadingValue = value
  })

  const getWld = async () => {
    try {
      const signer = await getProviderOrSigner(true)
      const hash = await getWhitelisted(signer)
      console.log(`${hash}`);
      
      joinedWhitelist.set(true)
    } catch (err) {
      console.error(err)
    }
  }

  onMount(async () =>{
    await checkIfAddressInWhitelist(await getProviderOrSigner(true))
  })
</script>

{#if joinedWhitelistValue}
  <h4><span class="badge bg-secondary">You already have joined to the Whitelist</span></h4>
{:else}
  {#if loadingValue}
    <button class="button">Loading...</button>  
  {:else}
  <button class="button" on:click={getWld}>Join to WL</button>
  {/if}
{/if}


<style>
.button {
  border-radius: 4px;
  background-color: blue;
  border: none;
  color: #ffffff;
  font-size: 15px;
  padding: 20px;
  width: 200px;
  cursor: pointer;
  margin-bottom: 2%;
}
</style>