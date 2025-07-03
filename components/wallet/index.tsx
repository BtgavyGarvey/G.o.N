// app/wallet/page.tsx
'use client';

import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function WalletPage() {
  const { data, isLoading } = useSWR('/api/wallet/balance', fetcher);

  const canWithdraw = data?.balance >= 5;
  const fee = data?.balance * 0.1;
  const net = data?.balance - fee;

  return (
    <main className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">Wallet</h1>

      <Card>
        <CardContent className="py-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Balance</span>
            <span className="font-semibold text-emerald-500">
              ${data?.balance?.toFixed(2) ?? '—'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Earned</span>
            <span className="font-semibold">
              ${data?.totalEarned?.toFixed(2) ?? '—'}
            </span>
          </div>
          <Button asChild disabled={!canWithdraw} className="w-full mt-4">
            <Link href="/gon/wallet/withdrawals/new">
              {canWithdraw ? 'Withdraw Funds' : 'Withdraw (min $5)'}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Link href="/gon/wallet/withdrawals" className="text-sm underline text-muted-foreground">
          View Withdrawal History
        </Link>
      </div>
    </main>
  );
}
