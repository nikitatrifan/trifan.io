import { lazy } from 'react'

const VercelAnalytics = lazy(() =>
  import('@vercel/analytics/react').then(mod => ({ default: mod.Analytics })));

export const Analytics = () => {
  return <VercelAnalytics />;
}