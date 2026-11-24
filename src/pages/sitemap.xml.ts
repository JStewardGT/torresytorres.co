import type { APIRoute } from 'astro';
import { SERVICES, servicePath } from '@/data/services';

export const GET: APIRoute = ({ site }) => {
  const urls = ['/', ...SERVICES.map(servicePath)].map((path) => {
    return `  <url><loc>${new URL(path, site).href}</loc></url>`;
  });

  return new Response([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
  ].join('\n'), { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
