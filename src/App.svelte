<script>
  import Main from './lib/Main.svelte'
  import Navbar from './lib/Navbar.svelte'

  import getProviderOrSigner from './lib/web3modal'

  const getSigner = async() => {
    const signer = await getProviderOrSigner()
    return signer
  }
  let providerOrSigner = getSigner()

</script>

<div>
  {#await providerOrSigner}
    <p>...connecting</p>
  {:then addr}
    <Navbar {...addr} />
    <Main />
  {/await}
</div>