// app/page.tsx
'use client';

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-600 to-indigo-800 text-white"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            🎲 Play the Game. 🎯 Beat the Odds. 💰 Win Real Cash.
          </h1>
          <p className="text-base sm:text-lg mb-6">
            Guess the number. Win $0.30. Withdraw at $5. 100% Free.
          </p>
          <Button onClick={() => signIn("google")}>Sign in with Google to Play</Button>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 sm:px-6 bg-background text-foreground"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">1. Sign In</h3>
              <p>Use your Google account. No passwords or hassle.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">2. Play</h3>
              <p>Choose a number. Beat your AI opponent. Earn $0.30 for every win.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">3. Withdraw</h3>
              <p>Once your balance hits $5, withdraw instantly (10% fee).</p>
            </div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 sm:px-6 bg-muted"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Why Choose Game of Numbers?</h2>
          <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 list-disc list-inside">
            <li>Fair & Transparent Game Rules</li>
            <li>Safe Google Login</li>
            <li>Real Cash Rewards</li>
            <li>Completely Free to Play</li>
            <li>Fun AI Opponents</li>
            <li>Mobile & Desktop Friendly</li>
          </ul>
        </motion.section>

        {/* Live Stats */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 sm:px-6 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Live Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-2xl font-bold">4,529</p>
              <p>Players Registered</p>
            </div>
            <div>
              <p className="text-2xl font-bold">12,844</p>
              <p>Games Played</p>
            </div>
            <div>
              <p className="text-2xl font-bold">$1,405</p>
              <p>Total Rewards Issued</p>
            </div>
            <div>
              <p className="text-2xl font-bold">132</p>
              <p>Players Online</p>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 px-4 sm:px-6 bg-muted"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">What Players Are Saying</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border rounded-xl bg-background">
              <p>"I played for free and cashed out $6. Easy and fun!"</p>
              <span className="block mt-2 font-semibold">– Brian N.</span>
            </div>
            <div className="p-4 border rounded-xl bg-background">
              <p>"The AI opponents make it feel like a real game."</p>
              <span className="block mt-2 font-semibold">– Achieng M.</span>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 px-4 sm:px-6 text-center bg-gradient-to-br from-emerald-600 to-green-800 text-white"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Win Real Money?</h2>
          <p className="mb-6 text-base sm:text-lg">Start playing now and earn rewards for every correct guess!</p>
          <Button onClick={() => signIn("google")} variant="secondary">
            Play Now – It's Free
          </Button>
        </motion.section>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Game of Numbers. All rights reserved.</p>
          <div className="mt-2">About · Terms · Privacy · Support</div>
        </footer>
      </div>
  );
}
