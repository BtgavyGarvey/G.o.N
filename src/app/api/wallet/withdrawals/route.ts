// pages/api/wallet/withdrawals.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with DB fetch
  return NextResponse.json([
    {
      _id: '1',
      amountRequested: 5,
      amountPaid: 4.5,
      fee: 0.5,
      payoutEmailOrPhone: 'user@example.com',
      status: 'paid',
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      amountRequested: 5,
      amountPaid: 4.5,
      fee: 0.5,
      payoutEmailOrPhone: 'user@example.com',
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
}
