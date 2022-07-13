import { useState, useEffect } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import nftMarketplaceAbi from '../constants/NftMarketplace.json';
import nftAbi from '../constants/BasicNft.json';
import Image from 'next/image';

const NftBox = ({ price, nftAddress, tokenId, marketplaceAddress, seller }) => {
  const [imageURI, setImageURI] = useState('');
  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: 'tokenURI',
    params: { tokenId }
  });

  const { isWeb3Enabled } = useMoralis();

  useEffect(() => {
    const updateUI = async () => {
      const tokenURI = await getTokenURI();
      console.log(`tokenURI: ${tokenURI}`);
      if (tokenURI) {
        const requestURL = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
        console.log(`requestUrl: ${requestURL}`);
        const tokenURIResponse = await (await fetch(requestURL)).json();
        const imageURI = tokenURIResponse.image;
        console.log(`imageURI: ${imageURI}`);
        const imageURIURL = imageURI.replace(
          'ipfs://',
          'https://ipfs.io/ipfs/'
        );
        console.log(`imageUrl: ${imageURIURL}`);
        setImageURI(imageURIURL);
      }
    };
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled, getTokenURI]);

  return (
    <div>
      <div>
        {imageURI ? (
          <Image
            loader={() => imageURI}
            src={imageURI}
            height="200"
            width="200"
            alt="nft"
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default NftBox;
