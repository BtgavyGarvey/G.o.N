import 'video.js';

declare module 'video.js' {
  export interface Player {
    ima?: (options?: {
      adTagUrl?: string;
      debug?: boolean;
      adsRenderingSettings?: {
        enablePreloading?: boolean;
      };
      locale?: string;
      timeout?: number;
      vpaidMode?: string;
    }) => void;

    // Optional helper if you're calling this manually
    initializeAdDisplayContainer?: () => void;
  }
}
