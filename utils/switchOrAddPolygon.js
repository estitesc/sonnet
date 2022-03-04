import loadWeb3 from '../utils/loadWeb3';

const switchOrAddPolygon = async (onSuccess) => {
  loadWeb3();

  try {
    await web3.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await web3.currentProvider.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com/'],
            blockExplorerUrls: ['https://polygonscan.com/']
          }],
        })
      } catch(error) {

      } finally {
        onSuccess();
      }
    }
  }
  finally {
    onSuccess();
  }
}

export default switchOrAddPolygon;