import rss from '@astrojs/rss';
import { getContainerRenderer } from '@astrojs/mdx/container-renderer';
import type { APIContext } from 'astro';
import { loadRenderers } from 'astro:container';
import { render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import GoogleDrivePlayer from '../components/GoogleDrivePlayer.astro';
import { SITE, getPosts, postExcerpt, postUrl, stripHtml } from '../site';

export async function GET(context: APIContext) {
  const container = await AstroContainer.create({ renderers: await loadRenderers([getContainerRenderer()]) });
  const posts = (await getPosts()).slice(0, 10);

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      return {
        title: post.data.title,
        description: stripHtml(postExcerpt(post)),
        content: await container.renderToString(Content, { props: { components: { GoogleDrivePlayer } } }),
        pubDate: post.data.date,
        link: postUrl(post),
        categories: [...post.data.tags, ...post.data.categories],
      };
    }),
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items,
  });
}
