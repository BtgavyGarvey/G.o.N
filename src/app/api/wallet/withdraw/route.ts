// pages/api/wallet/withdraw.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, method, recipient } = body;

  if (!amount || !recipient || amount < 5) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  // Normally you'd update the DB and deduct balance here
  console.log('Withdrawal request:', { amount, method, recipient });

  return NextResponse.json({ success: true });
}
