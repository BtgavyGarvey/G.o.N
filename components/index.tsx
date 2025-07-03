'use client';

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

export default function ClientHome({ session }: ClientPageProps) {
  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900">
      <HomeHeader />
      <main className="flex-1 overflow-y-auto p-2 min-h-screen">
        <HomePage />
      </main>
      <HomeFooter />
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
      <HomeFooter />
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
      <HomeFooter />
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
      <HomeFooter />
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
      <HomeFooter />
    </div>
  );
}
