// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://62c764991e09d943874667955b2b4144@o4509620853211136.ingest.de.sentry.io/4509620857012304',
  tracesSampleRate: 1.0, // Adjust for production
  environment: process.env.NODE_ENV,
});
