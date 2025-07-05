'use client';

import Script from "next/script";
import HomePage from "./Home";
import HomeFooter from "./Layout/Footer";
import HomeHeader from "./Layout/Navbar";
import PlayGamePage from "./PlayGame";
import WalletPage from "./wallet";
import WithdrawalsPage from "./wallet/withdrawal";
import NewWithdrawalPage from "./wallet/withdrawal/new";

interface SessionType {
  [key: string]: any;
}

interface ClientPageProps {
  session: SessionType | null;
  // Optional properties for specific pages
  id?: string;
  token?: string;
  callbackUrl?: string;
}

const AdsScripts = () => {
  return (
    <>

    {/* NATIVE BANNER */}

    <Script async data-cfasync="false" src="//pl27085030.profitableratecpm.com/66cb2c037d21df6a5a367c8f594187c0/invoke.js"></Script>
    <div id="container-66cb2c037d21df6a5a367c8f594187c0"></div>

    {/* BANNERS */}
      {/* <Script type="text/javascript">
        {`window.atOptions = {
          'key' : '36f15f3ad1b5f6d7280fe409fad1ec70',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };`}
      </Script>
      <Script type="text/javascript" src="//www.highperformanceformat.com/36f15f3ad1b5f6d7280fe409fad1ec70/invoke.js"></Script> */}


      <Script type="text/javascript">
        {`window.atOptions = {
          'key' : 'a00c125411ab6815b8ace57eba5996d4',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };`}
      </Script>
      <Script type="text/javascript" src="//www.highperformanceformat.com/a00c125411ab6815b8ace57eba5996d4/invoke.js"></Script>

      {/* <Script type="text/javascript">
        {`window.atOptions = {
          'key' : '75fb3cc42c947fad4df417b22cc5da33',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };`}
      </Script>
      <Script type="text/javascript" src="//www.highperformanceformat.com/75fb3cc42c947fad4df417b22cc5da33/invoke.js"></Script> */}

      {/* <Script type="text/javascript">
        {`window.atOptions = {
          'key' : '81ded906ce0ca4d55a82696533a22bb2',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };`}
      </Script>
      <Script type="text/javascript" src="//www.highperformanceformat.com/81ded906ce0ca4d55a82696533a22bb2/invoke.js"></Script> */}


      {/* <Script type="text/javascript">
        {`window.atOptions = {
          'key' : '0f7d4a42ed5f4ee744aa7c9f3e649b71',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };`}
      </Script>
      <Script type="text/javascript" src="//www.highperformanceformat.com/0f7d4a42ed5f4ee744aa7c9f3e649b71/invoke.js"></Script> */}

      {/* <Script type="text/javascript">
        {`window.atOptions = {
          'key' : '9b1e846f2f1031dc55ac7fab98c05fe7',
          'format' : 'iframe',
          'height' : 60,
          'width' : 468,
          'params' : {}
        };`}
      </Script>
      <Script type="text/javascript" src="//www.highperformanceformat.com/9b1e846f2f1031dc55ac7fab98c05fe7/invoke.js"></Script> */}
    </>
  );
}

export default function ClientHome({ session }: ClientPageProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-2 min-h-screen">
        <AdsScripts />
        <HomePage />
      </main>
      {/* <HomeFooter /> */}
    </div>
  );
}

export function ClientPlayGame({ session }: ClientPageProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-2 min-h-screen">
        <PlayGamePage />
      </main>
      {/* <HomeFooter /> */}
    </div>
  );
}

export function ClientWallet({ session }: ClientPageProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-2 min-h-screen">
        <WalletPage />
      </main>
      {/* <HomeFooter /> */}
    </div>
  );
}

export function ClientWalletWithdrawals({ session }: ClientPageProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-2 min-h-screen">
        <WithdrawalsPage />
      </main>
      {/* <HomeFooter /> */}
    </div>
  );
}

export function ClientWalletNewWithdrawal({ session }: ClientPageProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-2 min-h-screen">
        <NewWithdrawalPage />
      </main>
      {/* <HomeFooter /> */}
    </div>
  );
}


export function ClientAds() {
  return (
    <div className="bg-accent/85 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-5 w-full max-w-2xl max-h-full">
          <div className="p-2 bg-foreground dark:bg-background rounded-lg border shadow-sm w-full">

              <div className="px-6 py-4">
                  <h4 className="text-3xl font-semibold leading-none tracking-tight text-primary-foreground dark:text-white ">Adblock Detected</h4>
              </div>

              <div className="px-6">
                  <p className="text-lg text-balance text-primary-foreground dark:text-white">
                      It appears that you are using an ad-blocking extension in your browser. Our website relies on ad revenue to provide free content to our visitors. Please consider supporting us by disabling your ad blocker.
                  </p>
              </div>

              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 p-6 text-primary-foreground bg-primary m-4"
                  onClick={() => window.location.href='/'}
              >
                  Refresh Page
              </button>

          </div>
      </div>
  </div>
  );
}

