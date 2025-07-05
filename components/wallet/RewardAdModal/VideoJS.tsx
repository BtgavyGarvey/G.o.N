'use client';

import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads'; // Required for VAST/VPAID plugin
// import 'videojs-vast-vpaid';
import Player from "video.js/dist/types/player";

interface VideoJSProps {
  options: any;
  onReady?: (player: Player) => void;
}

export const VideoJS: React.FC<VideoJSProps> = ({ options, onReady }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered', 'video-js');
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, options, () => {
        videojs.log('Player is ready');
        if (onReady) onReady(player);
      });

      playerRef.current = player;
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.src(options.sources);
      player.autoplay(options.autoplay);
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div data-vjs-player className="w-full">
      <div ref={videoRef} />
    </div>
  );
};
