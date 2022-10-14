<script>
  import { onMount } from 'svelte';
  import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";
  import { Contract } from "ethers";
  import getProviderOrSigner from './web3modal'

  export let checkIfAddressInWhitelist = () => {}
  export let getNumberOfWhitelisted = () => {}

  export let joinedWhitelist
  let loading = false

  const getWhitelisted = async () => {
    try {
      const signer = await getProviderOrSigner(true)

      const whitelistContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await whitelistContract.addAddressToWhitelist()
      loading = true

      await tx.wait()
      loading = false

      await getNumberOfWhitelisted()

      joinedWhitelist = true
    } catch (err) {
      console.error(err)
    }
  }

  onMount(async () =>{
    await checkIfAddressInWhitelist()
  })
</script>

{#if joinedWhitelist}
  <span>You are Whitelisted</span>
{:else}
  {#if loading}
    <button class="button">Loading...</button>  
  {:else}
  <button class="button" on:click={getWhitelisted}>Join to WL</button>
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