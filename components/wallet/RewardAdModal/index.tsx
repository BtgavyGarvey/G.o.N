'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function VideoAdPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const videojs = (window as any).videojs;

      if (!videojs || !videoRef.current) return;

      try {
        const player = videojs(videoRef.current.id);

        // Check if ima plugin is registered and is a function
        if (typeof player.ima === 'function') {
          clearInterval(interval); // Stop polling

          player.ima({
            adTagUrl: 'https://www.videosprofitnetwork.com/watch.xml?key=d27dc1aa8e1b07b0a48a6fdf8aaa06ad',
            debug: true,
            adsRenderingSettings: {
              enablePreloading: true,
            },
          });

          player.ready(() => {
            player.ima?.initializeAdDisplayContainer();
            player.play();
          });
        }
      } catch (e) {
        console.error('Player init error:', e);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Load styles */}
      <link
        href="https://vjs.zencdn.net/8.10.0/video-js.css"
        rel="stylesheet"
      />

      {/* Load scripts in correct order */}
      <Script
        src="https://vjs.zencdn.net/8.10.0/video.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://imasdk.googleapis.com/js/sdkloader/ima3.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/videojs-contrib-ads@6.10.0/dist/videojs.ads.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/videojs-ima@1.10.0/dist/videojs.ima.min.js"
        strategy="beforeInteractive"
      />

      <div className="w-full flex justify-center mt-4">
        <video
          id="my-video"
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          controls
          width="640"
          height="360"
          preload="auto"
        >
          <source
            src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </>
  );
}
