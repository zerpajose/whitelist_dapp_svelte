import { ethers } from "ethers"
import Web3Modal from "web3modal"

const getProviderOrSigner = async (needSigner = false) => {
  const providerOptions = {
    injected: {
      display: {
        name: "Injected",
        description: "Connect with the provider in your Browser"
      },
      package: null
    }
  }
  
  const web3Modal = new Web3Modal({
    network: "goerli",
    providerOptions  // required
  })
  
  const instance = await web3Modal.connect()
  
  const provider = new ethers.providers.Web3Provider(instance)

  // const network = await provider.getNetwork();
  // const chainId = network.chainId;
  // console.log(`${chainId}`);

  if (needSigner) {
    const signer = provider.getSigner()
    return signer
  }
  
  return provider
}

export default getProviderOrSigner