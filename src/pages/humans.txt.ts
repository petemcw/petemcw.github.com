export function GET() {
  const lastUpdate = new Date().toISOString().slice(0, 10).replaceAll('-', '/');
  const body = `/* humanstxt.org */

/* TEAM */
  Developer: Pete McWilliams
  Twitter: petemcw
  Github: petemcw
  Location: Minneapolis, MN, USA

/* SITE */
  Last update: ${lastUpdate}
  Standards: HTML5, CSS3
  Components: Astro
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
