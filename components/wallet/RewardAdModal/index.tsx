'use client';

import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads'; // required by ima
import 'videojs-ima'; // adds .ima()
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const VAST_URL = 'https://s.magsrv.com/v1/vast.php?idzone=5663326';

export default function RewardAdModal({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [adComplete, setAdComplete] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      preload: 'auto',
    });

    // 👇 Safely extend `ima` if missing in types
    //@ts-expect-error
    player.ima({
      adTagUrl: VAST_URL,
      debug: false,
      timeout: 5000,
    });

    //@ts-expect-error
    player.ima.requestAds();

    player.on('adended', () => {
      setAdComplete(true);
    });

    return () => {
      player.dispose();
    };
  }, []);

  return (
    <Dialog open>
      <DialogContent className="space-y-4 text-center max-w-2xl">
        <h2 className="text-lg font-semibold">Watch full ad to earn $0.30</h2>

        <div className="w-full aspect-video bg-black rounded overflow-hidden">
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered"
            playsInline
          />
        </div>

        <Button
          disabled={!adComplete}
          onClick={onComplete}
          className="w-full"
        >
          {adComplete ? '🎁 Claim Your $0.30' : '⏳ Ad still playing...'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
