export type RouteContext = {
  fullPath: string;
  href: string;
}

export type WebVitalsMetric = {
  delta: number;
  value: number;
  id: string;
  name: 'TTFB' | 'FID' | 'LCP' | 'CLS' | 'FCP';
  entries: any[];
}
