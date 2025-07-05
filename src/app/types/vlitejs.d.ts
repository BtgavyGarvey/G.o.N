declare module 'vlitejs' {
  export default class Vlitejs {
    constructor(selector: string, config: {
      options?: {
        controls?: boolean;
        autoplay?: boolean;
        muted?: boolean;
        playsinline?: boolean;
      };
      plugins?: string[];
      onReady?: () => void;
    });

    destroy(): void;
  }
}
