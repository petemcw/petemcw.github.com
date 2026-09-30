import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../site';

// The home, tags, and categories pages are noindex, and /memorial/ is disallowed in robots.txt,
// so only posts belong here.
export async function GET(context: APIContext) {
  const urls = (await getPosts()).map(
    (post) => `  <url>
    <loc>${new URL(postUrl(post), context.site)}</loc>
    <lastmod>${post.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`,
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
