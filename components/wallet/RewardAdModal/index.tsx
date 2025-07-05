'use client';

import React, { useRef, useState } from 'react';
import { VideoJS } from './VideoJS';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { toast } from 'react-hot-toast';
import videojs from 'video.js';
import Player from "video.js/dist/types/player";

interface RewardAdModalProps {
  onComplete: () => void;
}

export default function RewardAdModal({ onComplete }: RewardAdModalProps) {
  const [adComplete, setAdComplete] = useState(false);
  const playerRef = useRef<Player | null>(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    preload: 'auto',
    fluid: true,
    // No direct video source — VAST will provide it
    sources: [],
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    (player as any).ads();

    (player as any).vastClient({
      adTagUrl: 'https://www.videosprofitnetwork.com/watch.xml?key=d27dc1aa8e1b07b0a48a6fdf8aaa06ad',
      playAdAlways: true,
      adCancelTimeout: 5000,
      adsEnabled: true,
      verbosity: 4,
    });

    (player as any).on('vast.adStarted', () => {
      console.log('✅ VAST ad started');
      setAdComplete(false);
    });

    (player as any).on('adend', () => {
      console.log('✅ VAST ad ended');
      setAdComplete(true);
      toast.success('✅ Ad watched. You may now claim your reward.');
    });

    (player as any).on('error', (e: any) => {
      console.error('Ad error:', e);
      toast.error('❌ An error occurred while playing the ad.');
    });
  };


  const handleClaimReward = () => {
    toast.success('🎁 You claimed $0.30!');
    onComplete();
  };

  return (
    <Dialog open>
      <DialogContent className="space-y-4 text-center max-w-2xl">
        <VisuallyHidden>
          <DialogTitle>Rewarded Ad</DialogTitle>
        </VisuallyHidden>

        <h2 className="text-lg font-semibold">🎥 Watch the full ad to claim $0.30</h2>

        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

        <Button
          disabled={!adComplete}
          onClick={handleClaimReward}
          className="w-full"
        >
          {adComplete ? '🎁 Claim Your $0.30 Reward' : '⏳ Watch ad to unlock reward'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
// This component handles the rewarded ad modal, allowing users to watch an ad and claim a reward.
// It uses VideoJS for video playback and integrates with a VAST ad server.