import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

export const revalidate = 0;

export default async function AboutUsPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // Horizontally centers the content
        alignItems: 'center', // Vertically centers the content
        height: '100vh', // Full viewport height
        margin: 0, // Removes any default margins
        textAlign: 'center', // Ensures text is centered
      }}
    >
      Coming Soon-------
    </div>
  );
}
