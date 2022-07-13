import styles from '../styles/Home.module.css';
import { useMoralisQuery } from 'react-moralis';
import NftBox from '../components/NftBox';

export default function Home() {
  const { data: listedNft, isFetching } = useMoralisQuery(
    'ActiveItem',
    (query) => query.limit(10).descending('tokenId')
  );

  return (
    <div className={styles.container}>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        listedNft.map((nft) => {
          console.log(nft.attributes);
          const { price, nftAddress, tokenId, marketplaceAddress, seller } =
            nft.attributes;
          return (
            <div key={`${nftAddress}-${tokenId}`}>
              Price: {price}, NftAddress: {nftAddress}, tokenId: {tokenId},
              seller: {seller}
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
      )}
    </div>
  );
}
