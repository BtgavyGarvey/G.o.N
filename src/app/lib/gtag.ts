/* eslint-disable */
'use client'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = "G-T1LJHF8RBB";

// Send pageview event to GA4
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

// Send custom events
export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};