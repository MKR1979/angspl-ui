import { Metadata } from 'next';
import ClientAddSiteConfig from './client-add-site-config';

export const metadata: Metadata = {
  title: 'Add SiteConfig'
};

export const revalidate = 0;

export default async function AddSiteConfigPage() {
  return <ClientAddSiteConfig></ClientAddSiteConfig>;
}
