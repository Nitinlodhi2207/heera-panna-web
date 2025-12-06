import { Metadata } from 'next';
import BridalHubClient from './BridalHubClient';

export const metadata: Metadata = {
  title: 'Bridal Hub | Exclusive Wedding Saree Collection',
  description: 'Explore our cinematic bridal collection. Handwoven Banarasi, Kanjivaram, and Maheshwari silk sarees for your special day.',
  alternates: {
    canonical: 'https://www.heerapannasaree.com/bridal-hub',
  },
};

export default function BridalHubPage() {
  return <BridalHubClient />;
}
