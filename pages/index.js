import styles from '../styles/Home.module.css';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import NftBox from '../components/NftBox';

export default function Home() {
  const { isWeb3Enabled, account } = useMoralis();

  const { data: listedNft, isFetching } = useMoralisQuery(
    'ActiveItem',
    (query) => query.limit(10).descending('tokenId')
  );

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flew-wrap">
        {isWeb3Enabled ? (
          isFetching ? (
            <div>Loading...</div>
          ) : (
            listedNft.map((nft) => {
              console.log(nft.attributes);
              const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                nft.attributes;
              return (
                <div key={`${nftAddress}-${tokenId}`}>
                  <NftBox
                    key={`${nftAddress}-${tokenId}`}
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marketplaceAddress={marketplaceAddress}
                    seller={seller}
                  />
                </div>
              );
            })
          )
        ) : (
          <div>Web3 is not enabled</div>
        )}
      </div>
    </div>
  );
}
