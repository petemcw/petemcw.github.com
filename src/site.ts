import { getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';

export const SITE = {
  title: 'Pete McWilliams',
  description: 'Christ Follower, Family Man, Outdoors Enthusiast, Technologist',
  postsPerPage: 10,
  author: {
    name: 'Pete McWilliams',
    email: undefined as string | undefined,
    twitter: 'petemcw',
    facebook: undefined as string | undefined,
    instagram: 'petemcw',
    github: 'petemcw',
    linkedin: 'petemcw',
  },
};

export type Post = CollectionEntry<'posts'>;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Matches Jekyll's `/:year/:title/` permalink, where :title is the filename minus its date prefix. */
export function postSlug(post: Post): string {
  return post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function postYear(post: Post): string {
  return String(post.data.date.getUTCFullYear());
}

export function postUrl(post: Post): string {
  return `/${postYear(post)}/${postSlug(post)}/`;
}

/** Front matter `excerpt` if set, otherwise the first paragraph of the body, as Jekyll did. */
export function postExcerpt(post: Post): string {
  if (post.data.excerpt !== undefined) return post.data.excerpt;
  const firstParagraph = (post.body ?? '').trim().split(/\n\s*\n/)[0] ?? '';
  return stripHtml(renderMarkdown(firstParagraph));
}

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/** "18 Dec 2017", formatted in UTC so dates never shift with the build machine's timezone. */
export function displayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/**
 * Groups newest-first posts by each value `pick` returns. Like Jekyll's site.tags, groups are
 * ordered by first appearance in the oldest post, and each group lists its posts newest first.
 */
export function groupPosts(posts: Post[], pick: (post: Post) => string[]): Map<string, Post[]> {
  const groups = new Map<string, Post[]>();
  for (const post of [...posts].reverse()) {
    for (const key of pick(post)) {
      groups.set(key, [post, ...(groups.get(key) ?? [])]);
    }
  }
  return groups;
}
