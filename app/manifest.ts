// app/manifest.ts
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chef's Zone",
    short_name: "Chef's Zone",
    description: 'Discover and share delicious homemade recipes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FF6B00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}