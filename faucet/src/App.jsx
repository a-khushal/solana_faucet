import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { RequestAirdrop } from './components/RequestAirdrop';

import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css'
import { SendTokens } from './components/SendTokens';

function App() {
  return (
    <ConnectionProvider endpoint={import.meta.env.VITE_SOLANA_RPC_URL}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <RequestAirdrop />
          <SendTokens/>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
