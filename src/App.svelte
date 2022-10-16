<script>

  import Content from './components/Content.svelte'
  import Modal from 'svelte-simple-modal'

  import Main from './components/Main.svelte'
  import Navbar from './components/Navbar.svelte'

  import getProviderOrSigner from './lib/web3modal'

  import { chainConnected } from './stores/store'

  let chainConnectedValue

  chainConnected.subscribe((value) => {
    chainConnectedValue = value
  })

  const getSigner = async() => {
    const signer = await getProviderOrSigner()
    return signer
  }
  let providerOrSigner = getSigner()

  const handleLoad = () => {

    if(window.ethereum.isConnected()){
      
      window.ethereum.request({ method: 'eth_chainId' }).then(
        (chainId) => {
          chainConnected.set(chainId)
        }
      )
      
      window.ethereum.on('chainChanged', (chainId) => {
        chainConnected.set(chainId)
      })
    }
  }

</script>

<svelte:window on:load={handleLoad}/>

<div>
  {#await providerOrSigner}
    <p>...connecting</p>
  {:then addr}
    <Navbar address={addr['provider']['selectedAddress']} />
    <Main />
  {/await}
</div>
<Modal
  closeButton={false}
  closeOnEsc={false}
  closeOnOuterClick={false}
>
  <Content />
</Modal>