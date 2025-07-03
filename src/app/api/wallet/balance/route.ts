// pages/api/wallet/balance.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Replace with real user ID lookup
  return NextResponse.json({
    balance: 6.2,
    totalEarned: 15.3,
  });
}
