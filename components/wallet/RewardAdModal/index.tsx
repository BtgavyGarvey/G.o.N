'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function RewardAdModal({ onComplete }: { onComplete: () => void }) {
  const [adWatched, setAdWatched] = useState(false);

//   useEffect(() => {
//   const container = document.getElementById('container-8914e86c41be0eef40ae1779cf921b18');
//   if (!container) return;

//   container.innerHTML = '';
//   const script = document.createElement('script');
//   script.src = '//pl26127566.profitableratecpm.com/8914e86c41be0eef40ae1779cf921b18/invoke.js';
//   script.async = true;
//   script.setAttribute('data-cfasync', 'false');
//   container.appendChild(script);
// }, []);

  return (
    <Dialog open>
        
      <DialogContent className="text-center space-y-4 max-w-lg">
        <h2 className="text-lg font-semibold">Watch Ad to Receive $0.30</h2>

        <div className="border p-4 w-full flex justify-center items-center min-h-[80px]">
          <div id="container-8914e86c41be0eef40ae1779cf921b18" className="w-full" />
        </div>

        <Button disabled={!adWatched} onClick={onComplete} className="w-full">
          {adWatched ? '🎁 Claim Your $0.30' : '⏳ Watching Ad...'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
