import '../styles/globals.css';
import { MoralisProvider } from 'react-moralis';
import Header from '../components/header';
import Head from 'next/head';

const { APP_ID, SERVER_URL } = process.env;

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="NFT Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Header />
        <Component {...pageProps} />
      </MoralisProvider>
    </div>
  );
}

export default MyApp;
