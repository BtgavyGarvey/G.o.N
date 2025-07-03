// app/wallet/withdrawals/page.tsx
'use client';

import useSWR from 'swr';
import { Card, CardContent } from '@/components/ui/card';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function WithdrawalsPage() {
  const { data, isLoading } = useSWR('/api/wallet/withdrawals', fetcher);

  return (
    <main className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">Withdrawal History</h1>

      {isLoading && <p>Loading...</p>}

      {!isLoading && data?.length === 0 && (
        <p className="text-muted-foreground">You haven't made any withdrawals yet.</p>
      )}

      <div className="space-y-4">
        {data?.map((tx: any) => (
          <Card key={tx._id}>
            <CardContent className="py-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requested</span>
                <span>${tx.amountRequested.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid</span>
                <span>${tx.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span
                  className={`font-semibold ${
                    tx.status === 'paid'
                      ? 'text-emerald-600'
                      : tx.status === 'failed'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {tx.status}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {new Date(tx.createdAt).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
