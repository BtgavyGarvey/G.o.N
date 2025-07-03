// app/wallet/withdrawals/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function NewWithdrawalPage() {
  const router = useRouter();
  const { data: wallet } = useSWR('/api/wallet/balance', fetcher);
  const [recipient, setRecipient] = useState('');
  const [method, setMethod] = useState<'paypal' | 'mpesa'>('paypal');
  const [submitting, setSubmitting] = useState(false);

  const balance = wallet?.balance || 0;
  const minReached = balance >= 5;
  const fee = balance * 0.1;
  const payout = balance - fee;

  const handleSubmit = async () => {
    if (!minReached) return;

    setSubmitting(true);
    const res = await fetch('/api/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ method, recipient, amount: balance }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    setSubmitting(false);

    if (res.ok) {
      toast.success('Withdrawal requested successfully.');
      router.push('/wallet/withdrawals');
    } else {
      toast.error(result.message || 'Failed to request withdrawal.');
    }
  };

  return (
    <main className="max-w-xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-2xl font-bold mb-6">Request Withdrawal</h1>

      <Card>
        <CardContent className="py-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Payout Method</label>
            <select
              className="w-full border rounded-md px-3 py-2 bg-background"
              value={method}
              onChange={e => setMethod(e.target.value as any)}
            >
              <option value="paypal">PayPal</option>
              <option value="mpesa">M-Pesa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              {method === 'paypal' ? 'PayPal Email' : 'Phone Number'}
            </label>
            <Input
              placeholder={method === 'paypal' ? 'example@gmail.com' : '0712345678'}
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              required
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p>💰 Balance: ${balance.toFixed(2)}</p>
            <p>💸 10% Fee: ${fee.toFixed(2)}</p>
            <p>📥 Net Payout: ${payout.toFixed(2)}</p>
          </div>

          <Button
            className="w-full mt-4"
            disabled={!minReached || !recipient || submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Submitting...' : 'Confirm Withdrawal'}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
