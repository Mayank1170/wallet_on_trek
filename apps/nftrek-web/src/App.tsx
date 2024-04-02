import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
// import { UnifiedWalletButton, UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React,{ FC, ReactNode, useMemo, useState } from "react";
// import './index.css'
// import './App.css'
// require('./App.css');
import "@solana/wallet-adapter-react-ui/styles.css";


const App: FC = () => {
  const successCallback = (position: any) => {
    console.log(position);
  };
  
  const errorCallback = (error: any) => {
    console.log(error);
  };
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  
  return (
    <Context>
      <Content />
    </Context>
  );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
      () => [
          /**
           * Wallets that implement either of these standards will be available automatically.
           *
           *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
           *     (https://github.com/solana-mobile/mobile-wallet-adapter)
           *   - Solana Wallet Standard
           *     (https://github.com/solana-labs/wallet-standard)
           *
           * If you wish to support a wallet that supports neither of those standards,
           * instantiate its legacy wallet adapter here. Common legacy adapters can be found
           * in the npm package `@solana/wallet-adapter-wallets`.
           */
          new UnsafeBurnerWalletAdapter(),
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
};

//   return (
// <UnifiedWalletProvider
//       wallets={[]}
//       config={{
//         autoConnect: false,
//         env: 'mainnet-beta',
//         metadata: {
//           name: 'UnifiedWallet',
//           description: 'UnifiedWallet',
//           url: 'https://jup.ag',
//           iconUrls: ['https://jup.ag/favicon.ico'],
//         },
//         // notificationCallback: WalletNotification,
//         walletlistExplanation: {
//           href: 'https://station.jup.ag/docs/additional-topics/wallet-list',
//         },
//       }}
//     >
//       <UnifiedWalletButton />
//     </UnifiedWalletProvider>
//   );
// };
const CameraDisplay: FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  React.useEffect(() => {
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
        })
        .catch((error) => {
          console.error("Error accessing user media:", error);
        });
    }
  }, [stream]);

  if (!stream) return null;

  return (
    <div>
      <video
        width={320}
        height={240}
        autoPlay
        ref={(video) => {
          if (video) {
            video.srcObject = stream;
          }
        }}
      />
    </div>
  );
};


const Content: FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };
  return (
    <div>
      <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
        <WalletMultiButton />
      </div>

      <div
        style={{
          width: "100%",
          // height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
          <button onClick={handleCameraClick}>
            <img
              width={"250px"}
              height={"150px"}
              src="./images/cameraImage.png"
              alt="Camera image"
              style={{ cursor: "pointer" }}
            />
          </button>
      {isCameraOpen && <CameraDisplay />}
        <h1 style={{ color: "black", fontSize: "30px" }}>Camera</h1>
        {/* <p style={{width: "40vw"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dicta
          nostrum facere harum accusamus eligendi quas? Velit deserunt quo,
          neque facilis at laboriosam tenetur dolor earum vitae dolorem iste
          nostrum?
        </p> */}
        <textarea id="" name="" style={{height: "100px", width: "500px"}}>
         
        </textarea>{" "}
        <button style={{ fontSize: "30px", marginTop: "40px" }}>
          Mint as NFT
        </button>
      </div>
    </div>
  );
};
