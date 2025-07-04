'use client';

import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads';
import 'videojs-ima';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

const VAST_URL = 'https://s.magsrv.com/v1/vast.php?idzone=5664422';

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

    // @ts-expect-error: ima not typed
    player.ima({
      adTagUrl: VAST_URL,
      debug: true,
      timeout: 5000,
    });

    // @ts-expect-error
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
        {/* ✅ Accessible title for screen readers */}
        <VisuallyHidden>
          <DialogTitle>Rewarded Ad</DialogTitle>
        </VisuallyHidden>

        <h2 className="text-lg font-semibold">Watch the full ad to claim $0.30</h2>

        <div className="w-full aspect-video bg-black rounded overflow-hidden">
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered w-full h-full"
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
